import { Alert, Box, Modal, Rating, styled, TextField, Typography } from "@mui/material"
import { Botao } from "../globals/Button.style";
import { useEffect, useState } from "react";
import { Theme } from "../../styles/theme";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { StarRounded } from "@mui/icons-material";
import { set, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookData } from "../../types/bookData";
import { ButtonsDiv, ProgressionForm, ProgressionSpan } from "./progression-modal.styles";
import { BookService } from "../../api/services/BookService";

type ProgressionModalProps = {
    isOpen: boolean;
    handleModal: () => void | undefined;
}

const styledBox = {
    backgroundColor: 'white', position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: Theme.margins.margin1rem,
    borderRadius: Theme.borders.radius,
}


const progressionFilter = z.object({
    commentary: z.string(),
    pages: z.number(),
    myBooksId: z.string().uuid()
})

type ProgressionFilter = z.infer<typeof progressionFilter>

export const ProgressionModal = (
    { isOpen, handleModal }: ProgressionModalProps,
    { id, title }: BookData) => {
    const [value, setValue] = useState<number | null>(2);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>();
    const [error, setError] = useState<string | null>();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<ProgressionFilter>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(progressionFilter)
    });

    const onSubmit: SubmitHandler<ProgressionFilter> = async () => {
        const service = new BookService()
        setLoading(true);

        const data = {
            commentary: watch('commentary'),
            pages: watch('pages'),
            myBooksId: id
        } as BookData
        
        const response = await service.postProgression(data);

        if (response?.statusCode != 200) {
            setLoading(false);
            setSuccess(response?.resolve ?? null);
        } else setError(response?.reject ?? null);
    }


    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box width={500} height={'max-content'}
                sx={styledBox}>
                <Box>
                    <ProgressionForm onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="h5" component="h2">
                            {title}
                        </Typography>
                        <ProgressionSpan>
                            Conte um pouco sobre sobre o que está achando do livro e da leitura.
                        </ProgressionSpan>
                        <p>
                            Progressão da leitura:
                        </p>

                        <TextField
                            sx={{ width: '100%' }}
                            {...register('commentary')}
                            required
                            multiline
                            minRows={4}
                            placeholder="Fale um pouco sobre o que você leu"
                        />
                        <p>Quantidade de páginas lidas: </p>
                        <TextField
                            {...register('pages')}
                            required
                            type="number"
                            placeholder="Páginas" />
                        <ButtonsDiv>
                            <Botao
                                borderRadius={Theme.borders.radius}
                                color={Theme.colors.white}
                                fontSize={Theme.font.sizes.xsmall}
                                onClick={handleModal}
                            >Cancelar</Botao>
                            <Botao
                                backgroundColor={Theme.colors.green}
                                borderRadius={Theme.borders.radius}
                                color={Theme.colors.white}
                                fontSize={Theme.font.sizes.xsmall}
                                onClick={handleModal}>Salvar</Botao>
                        </ButtonsDiv>

                        {success && <Alert severity="success">{success}</Alert>}
                        {error && <Alert severity="error">{error}</Alert>}

                    </ProgressionForm>
                </Box>
            </Box>
        </Modal>
    )
}