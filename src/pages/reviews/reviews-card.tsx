import { Rating } from "@mui/material";
import { BookData } from "../../types/bookData";
import { BoxWrapper, Icons, ReviewDate, ReviewDetails, TitleRating } from "./reviews-box.styles";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { formatDate } from "../../utils/filters";
import { Theme } from "../../styles/theme";
import { useState } from "react";
import { ReviewModal } from "./edit-review";

export const ReviewsCard = ({ review, isEditable }: { review: BookData['reviews'][]; isEditable: boolean }) => {
    const [selectedReview, setSelectedReview] = useState<BookData['reviews'] | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleEditClick = (review: BookData['reviews']) => {
        setSelectedReview(review);
        setIsEditOpen(true);
    };

    const handleModalClose = () => {
        setIsEditOpen(false);
        setSelectedReview(null);
    };

    const sortedReviews = review.sort((a, b) => {
        const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
    });
    return (
        <>
            {sortedReviews && sortedReviews.map((review: BookData['reviews']) => (
                <BoxWrapper id="box-wrapper">
                    <img src={review?.thumbnailUrl ?? review?.smallThumbnailUrl} alt={review?.title} />
                    <ReviewDetails id="review-details">
                        <TitleRating id="title-rating">
                            <p>{review?.title}</p>
                            <Icons>
                                <Rating
                                    name="read-only"
                                    value={review?.rating} readOnly
                                    icon={<StarRoundedIcon fontSize="inherit" />}
                                    emptyIcon={<StarBorderRoundedIcon style={{ opacity: 0.55 }} />}
                                />
                                {isEditable &&
                                    <a onClick={() => handleEditClick(review)}>
                                        <EditRoundedIcon
                                            sx={{ fill: `${Theme.colors.pink}` }} />
                                    </a>
                                }

                            </Icons>
                        </TitleRating>
                        <p>{review?.review}</p>
                        <ReviewDate id="review-date">{formatDate(review?.createdAt ?? '')}</ReviewDate>
                    </ReviewDetails>
                </BoxWrapper>
            ))}
            {selectedReview && (
                <ReviewModal
                    isOpen={isEditOpen}
                    handleModal={handleModalClose}
                    bookId={selectedReview.bookId}
                    title={selectedReview.title}
                    reviewData={selectedReview}
                    isEditing={true}
                />
            )}
        </>
    )
}