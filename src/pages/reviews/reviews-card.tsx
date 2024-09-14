import { Rating } from "@mui/material";
import { BookData } from "../../types/bookData";
import { BoxWrapper, Icons, Like, LikeDetails, ReviewActions, ReviewDate, ReviewDetails, TitleRating } from "./reviews-box.styles";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { formatDate } from "../../utils/filters";
import { Theme } from "../../styles/theme";
import { useState } from "react";
import { ReviewModal } from "../../components/Review/edit-review.tsx";
import { Heart } from "../../components/globals/Heart.style";
import { useFetchLikesQuantityByReview } from "../../api/hooks/useFetchLikesQuantityByReview";
import { Link } from "react-router-dom";
import { ReportReview } from "../../components/globals/Report";
import { DeleteReviewDialog } from "./delete-review-dialog.tsx";

type ReviewsCardProps = {
    review: BookData['reviews'];
    isEditable: boolean;
    isLikable: boolean;
    refetchReviews?: () => void;
    refetchBookDetails?: () => void;
};

export const ReviewsCard = ({ review, isEditable, isLikable, refetchReviews, refetchBookDetails }: ReviewsCardProps) => {
    const [selectedReview, setSelectedReview] = useState<BookData['reviews'] | null>(null);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const { likesQuantity } = useFetchLikesQuantityByReview(review?.id ?? '');
    console.log(review)
    const handleEditClick = (review: BookData['reviews']) => {
        setSelectedReview(review);
        setIsEditOpen(true);
    };

    const handleDeleteClick = () => setDeleteDialogOpen(!deleteDialogOpen)

    const handleModalClose = () => {
        setIsEditOpen(false);
        setSelectedReview(null);
    };


    return (
        <>
            <BoxWrapper id="box-wrapper">
                <Link to={`/bookdetails/${review?.googleId}`}>
                    <img src={review?.thumbnailUrl ?? review?.smallThumbnailUrl} alt={review?.title} />
                </Link>

                <ReviewDetails id="review-details">
                    <TitleRating id="title-rating">
                        <Link to={`/bookdetails/${review?.googleId}`}>
                            <p>{review?.title}</p>
                        </Link>
                        <Icons>
                            <Rating
                                name="read-only"
                                value={review?.rating} readOnly
                                icon={<StarRoundedIcon fontSize="inherit" />}
                                emptyIcon={<StarBorderRoundedIcon style={{ opacity: 0.55 }} />}
                            />

                            {isEditable &&
                                <ReviewActions>
                                    <a onClick={() => handleEditClick(review)}>
                                        <EditRoundedIcon
                                            sx={{ fill: `${Theme.colors.pink}` }} />
                                    </a>
                                    <a onClick={handleDeleteClick}>
                                        <DeleteRoundedIcon
                                            sx={{ fill: `${Theme.colors.pink}` }} />
                                    </a>
                                </ReviewActions>
                            }
                        </Icons>
                    </TitleRating>
                    <p>{review?.review}</p>
                    <Like>
                        {isLikable &&
                            <LikeDetails>
                                <Heart refetchReviews={refetchReviews} type="review" reviewId={review && review.id} />
                                <span>{likesQuantity}</span>
                            </LikeDetails>}
                        <div>
                            <ReportReview reviewId={review?.id as string} />
                            <ReviewDate id="review-date">{formatDate(review?.createdAt ?? '')}</ReviewDate>
                        </div>
                    </Like>
                </ReviewDetails>
            </BoxWrapper>

            <DeleteReviewDialog
                refetchReviews={refetchReviews}
                handleDialog={handleDeleteClick}
                deleteDialogOpen={deleteDialogOpen}
                reviewId={review?.id as BookData['reviews']} />

            {selectedReview && (
                <ReviewModal
                    refetchBookDetails={refetchBookDetails}
                    refetchReviews={refetchReviews}
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