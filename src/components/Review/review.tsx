import { Alert, Box, Modal, Rating, TextField, Typography } from "@mui/material"
import { ButtonsDiv, ProgressionForm, ProgressionSpan, styledBox } from "../ProgressionModal/progression-modal.styles";
import { Botao } from "../globals/Button.style";
import { Theme } from "../../styles/theme";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { BookData } from "../../types/bookData";
import { BookService } from "../../api/services/BookService";
import { StatusCode } from "../../api/client/IHttpClient";

const labels: { [index: string]: string } = {
    0.5: 'Péssimo',
    1: 'Péssimo+',
    1.5: 'Ruim',
    2: 'Ruim+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Bom',
    4: 'Bom+',
    4.5: 'Excelente',
    5: 'Excelente+',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

type ReviewModalProps = {
    isOpen: boolean;
    handleModal: () => void | undefined;
    bookId: BookData['bookId'];
    title: BookData['title'];
    refreshBookDetails?: () => void;
}

const reviewFilter = z.object({
    review: z.string().min(3, { message: 'Comentário deve ter no mínimo 3 caracteres' }),
})

type ReviewFilter = z.infer<typeof reviewFilter>

export const ReviewModal = ({ isOpen, handleModal, bookId, title, refreshBookDetails }: ReviewModalProps & { isEditing: boolean }) => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<number | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ReviewFilter>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(reviewFilter)
    });

    const onSubmit: SubmitHandler<ReviewFilter> = async () => {
        setLoading(true);

        const service = new BookService();

        const data: BookData['reviews'] = {
            review: watch('review'),
            rating: value
        }
        const response = await service.postReview({ bookId, reviews: data });

        if (response?.statusCode === StatusCode.Created) {
            setLoading(false);
            setError(undefined);
            setSuccess(response?.resolve);
            setTimeout(() => setSuccess(undefined), 3000);
            refreshBookDetails && refreshBookDetails();
        } else {
            setSuccess(undefined);
            setError(response?.reject);
            setTimeout(() => setError(undefined), 3000);
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
                        <h3>{title}</h3>
                        <ProgressionSpan>
                            Agora que você terminou de ler, que tal avaliar o livro? Conte para nós o que achou!
                        </ProgressionSpan>
                        <p>Nota</p>

                        <Box sx={{ display: 'inline-flex' }}>
                            <Rating
                                precision={0.5}
                                onChange={(_event, newValue) => setValue(newValue ?? undefined)}
                                getLabelText={getLabelText}
                                icon={<StarRoundedIcon fontSize="inherit" />}
                                emptyIcon={<StarBorderRoundedIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                            {value !== null && (
                                <Typography sx={{ ml: 2 }}>{labels[value!!]}</Typography>
                            )}
                        </Box>

                        <p>Escreva sua review:</p>
                        <TextField
                            {...register('review')}
                            multiline
                            minRows={4}
                            error={!!errors.review}
                            placeholder="Escreva aqui o que você achou desse livro." />

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
