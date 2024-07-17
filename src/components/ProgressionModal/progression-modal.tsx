import { Alert, Box, Modal, TextField, Typography } from "@mui/material"
import { Botao } from "../globals/Button.style";
import { useState } from "react";
import { Theme } from "../../styles/theme";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookData } from "../../types/bookData";
import { ButtonsDiv, ProgressionForm, ProgressionSpan } from "./progression-modal.styles";
import { BookService } from "../../api/services/BookService";
import { StatusCode } from "../../api/client/IHttpClient";

type ProgressionModalProps = {
    isOpen: boolean;
    handleModal: () => void | undefined;
    id: BookData['id'];
    title?: BookData['title'];
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
    commentary: z.string().min(3, { message: 'Comentário deve ter no mínimo 10 caracteres' }),
    page: z.coerce.number({ message: 'Você deve digitar um número' }).positive({ message: 'Número deve ser inteiro' }).int({ message: 'Número deve ser inteiro' }),
    bookId: z.string()
})

type ProgressionFilter = z.infer<typeof progressionFilter>

export const ProgressionModal = (
    { isOpen, handleModal, id, title }: ProgressionModalProps) => {
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

    // console.log(errors)

    const onSubmit: SubmitHandler<ProgressionFilter> = async (data) => {
        setLoading(true);

        const modifiedData = {
            ...data,
            pages: data.page.toString(),
        };
        console.log(modifiedData)

        const service = new BookService()

        const response = await service.postProgression(modifiedData as BookData);

        if (response?.statusCode === StatusCode.Created) {
            setLoading(false);
            setSuccess(response?.resolve);
            setError(null);
        } else {
            setError(response?.reject);
            setSuccess(null);
        }
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
                        <TextField
                            hidden={true}
                            {...register('bookId')}
                            value={id}>
                            {id}
                        </TextField>
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
                            error={!!errors.commentary}
                            helperText={errors.commentary?.message}
                            placeholder="Fale um pouco sobre o que você leu"
                        />

                        <p>Quantidade de páginas lidas: </p>
                        <TextField
                            {...register('page')}
                            required
                            type="number"
                            error={!!errors.page}
                            helperText={errors.page?.message}
                            placeholder="Páginas" />

                        <ButtonsDiv>
                            <Botao
                                type="button"
                                borderRadius={Theme.borders.radius}
                                color={Theme.colors.white}
                                fontSize={Theme.font.sizes.xsmall}
                                onClick={handleModal}
                            >Cancelar</Botao>
                            <Botao
                                type="submit"
                                backgroundColor={Theme.colors.green}
                                borderRadius={Theme.borders.radius}
                                color={Theme.colors.white}
                                fontSize={Theme.font.sizes.xsmall}
                            >Salvar</Botao>
                        </ButtonsDiv>

                        {success && <Alert severity="success">{success}</Alert>}
                        {error && <Alert severity="error">{error}</Alert>}

                    </ProgressionForm>
                </Box>
            </Box>
        </Modal>
    )
}