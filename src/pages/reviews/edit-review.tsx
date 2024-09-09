import { Alert, Box, Modal, Rating, TextField, Typography } from "@mui/material";

import { Theme } from "../../styles/theme";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { BookData } from "../../types/bookData";
import { BookService } from "../../api/services/BookService";
import { StatusCode } from "../../api/client/IHttpClient";
import { ButtonsDiv, ProgressionForm, ProgressionSpan, styledBox } from "../../components/ProgressionModal/progression-modal.styles";
import { Botao } from "../../components/globals/Button.style";

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
    bookId?: BookData['bookId'];
    title?: BookData['title'];
    reviewData?: BookData['reviews'];
    isEditing: boolean;
    refetchReviews?: () => void;
    refetchBookDetails?: () => void;
};

const reviewFilter = z.object({
    review: z.string().min(3, { message: 'Comentário deve ter no mínimo 3 caracteres' }).max(250, { message: 'Comentário deve ter no máximo 250 caracteres' }),
});

type ReviewFilter = z.infer<typeof reviewFilter>;

export const ReviewModal = ({ isOpen, handleModal, bookId, title, reviewData, isEditing, refetchReviews, refetchBookDetails }: ReviewModalProps) => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<number | undefined>(reviewData?.rating);
    const [success, setSuccess] = useState<string | null>();
    const [error, setError] = useState<string | null>();

    const { watch, register, handleSubmit, reset, setValue: setFormValue, formState: { errors } } = useForm<ReviewFilter>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(reviewFilter),
        defaultValues: {
            review: reviewData?.review,
        }
    });

    useEffect(() => {
        if (isEditing && reviewData) {
            setFormValue('review', reviewData.review ?? '');
            setValue(reviewData.rating);
        }
    }, [isEditing, reviewData, setFormValue]);

    const onSubmit: SubmitHandler<ReviewFilter> = async () => {
        setLoading(true);

        const service = new BookService();
        const data: BookData['reviews'] = {
            ...reviewData,
            review: watch('review'),
            rating: value,
        };

        const response = isEditing
            ? await service.updateReview({ id: reviewData?.id, reviews: data })
            : await service.postReview({ bookId, reviews: data });

        if (response?.statusCode === StatusCode.Created || response?.statusCode === StatusCode.Ok) {
            setLoading(false);
            setError(null);
            setSuccess(response?.resolve);
            console.log(!!!refetchBookDetails);
            setTimeout(() => {
                refetchBookDetails && refetchBookDetails();
                refetchReviews && refetchReviews();
                handleModal();
                reset();
                setSuccess(null);
            }, 2000);
        } else {
            setSuccess(null);
            setError(response?.reject);
            setTimeout(() => {
                setError(null);
                handleModal();
            }, 2000);
        }
    };

    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box width={500} height={'max-content'} sx={styledBox}>
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
                                value={value}
                                onChange={(_event, newValue) => setValue(newValue ?? undefined)}
                                getLabelText={getLabelText}
                                icon={<StarRoundedIcon fontSize="inherit" />}
                                emptyIcon={<StarBorderRoundedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            {value !== null && (
                                <Typography sx={{ ml: 2 }}>{labels[value!!]}</Typography>
                            )}
                        </Box>
                        <p>Escreva sua review:</p>
                        <TextField
                            {...register('review')}
                            multiline={true}
                            minRows={4}
                            error={!!errors.review}
                            placeholder="Escreva aqui o que você achou desse livro."
                        />
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
    );
};
