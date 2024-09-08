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

type ProgressionModalProps = {
    isOpen: boolean;
    handleModal: () => void | undefined;
    bookId: BookData['bookId'];
    title?: BookData['title'];
    googleId?: BookData['googleId'];
    refetchPages?: () => void;
    maxPage?: number;
    actualPage?: number;
}

export const ProgressionModal = (
    { isOpen, handleModal, bookId, title, googleId, refetchPages, maxPage, actualPage }: ProgressionModalProps) => {

    const progressionFilter = z.object({
        commentary: z.string().max(250, { message: 'Comentário deve ter no máximo 250 caracteres' }),
        page: z.coerce.number({ message: 'Você deve digitar um número' }).positive({ message: 'Número deve ser positivo' }).int({ message: 'Número deve ser inteiro' }).max(maxPage as number, { message: `Número deve ser menor ou igual a ${maxPage}` }),
        bookId: z.string(),
        googleId: z.string()
    })

    type ProgressionFilter = z.infer<typeof progressionFilter>

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<ProgressionFilter>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(progressionFilter)
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>();
    const [error, setError] = useState<string | null>();

    const onSubmit: SubmitHandler<ProgressionFilter> = async () => {
        setLoading(true);

        const data = {
            googleId: googleId,
            bookId: bookId,
            commentary: watch('commentary'),
            page: watch('page'),
        }

        const service = new BookService()
        const response = await service.postProgression(data as BookData);
        if (response?.statusCode === StatusCode.Created || response?.statusCode === StatusCode.Ok) {
            setLoading(false);
            setError(null);
            setSuccess(response?.resolve);
            refetchPages && refetchPages();
            setTimeout(() => {
                setSuccess(null);
                handleModal();
                reset();
            }, 2000);
        } else {
            setSuccess(null);
            setError(response?.reject);
            setTimeout(() => setError(null), 3000);
            handleModal();
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

                        <TextField sx={{ display: 'none' }}
                            {...register('googleId')}
                            value={googleId} />

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