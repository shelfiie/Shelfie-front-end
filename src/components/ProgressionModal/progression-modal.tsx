import { Alert, Box, Modal, TextField } from "@mui/material"
import { Botao } from "../globals/Button.style";
import { useState } from "react";
import { Theme } from "../../styles/theme";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookData } from "../../types/bookData";
import { ButtonsDiv, ProgressionForm, ProgressionSpan, styledBox } from "./progression-modal.styles";
import { BookService } from "../../api/services/BookService";
import { StatusCode } from "../../api/client/IHttpClient";
import { useFetchLastPage } from "../../api/hooks/useFetchLastPage";

type ProgressionModalProps = {
    isOpen: boolean;
    handleModal: () => void | undefined;
    bookId: BookData['bookId'];
    title?: BookData['title'];
}

const progressionFilter = z.object({
    commentary: z.string().min(3, { message: 'Comentário deve ter no mínimo 10 caracteres' }),
    page: z.coerce.number({ message: 'Você deve digitar um número' }).positive({ message: 'Número deve ser positivo' }).int({ message: 'Número deve ser inteiro' }),
    bookId: z.string()
})

type ProgressionFilter = z.infer<typeof progressionFilter>

export const ProgressionModal = (
    { isOpen, handleModal, bookId, title }: ProgressionModalProps) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>();
    const [error, setError] = useState<string | null>();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ProgressionFilter>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(progressionFilter)
    });

    const { actualPage, maxPage } = useFetchLastPage(bookId);

    const onSubmit: SubmitHandler<ProgressionFilter> = async (data) => {
        setLoading(true);

        const service = new BookService()

        const response = await service.postProgression(data as BookData);

        if (response?.statusCode === StatusCode.Created) {
            setLoading(false);
            setError(null);
            setSuccess(response?.resolve);
            setTimeout(() => setSuccess(null), 3000);
        } else {
            setSuccess(null);
            setError(response?.reject);
            setTimeout(() => setError(null), 3000);
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
                        <TextField sx={{ display: 'none' }}
                            {...register('bookId')}
                            value={bookId} />

                        <h3>{title}</h3>

                        <ProgressionSpan>
                            Conte um pouco sobre sobre o que está achando do livro e da leitura.
                        </ProgressionSpan>
                        <p>
                            Progressão da leitura [{actualPage}/{maxPage}]:
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

                        <p>Total da quantidade de páginas lidas: </p>
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
                                disabled={loading}
                                type="submit"
                                backgroundColor={Theme.colors.green}
                                borderRadius={Theme.borders.radius}
                                color={Theme.colors.white}
                                fontSize={Theme.font.sizes.xsmall}
                            >{loading ? 'Carregando' : 'Salvar'}</Botao>
                            
                        </ButtonsDiv>

                        {success && <Alert severity="success">{success}</Alert>}
                        {error && <Alert severity="error">{error}</Alert>}

                    </ProgressionForm>
                </Box>
            </Box>
        </Modal>
    )
}