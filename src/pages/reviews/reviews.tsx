import { Layout } from "../layout/layout"
import { Rating } from "@mui/material";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { BoxesWrappers, BoxWrapper, Icons, ReviewDate, ReviewDetails, ReviewsContent, TitleRating } from "./reviews-box.styles";
import { useFetchReviewsByUser } from "../../api/hooks/useFetchReviewsByUser";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Theme } from "../../styles/theme";
import { formatDate } from "../../utils/filters";

export const Reviews = () => {
  const { reviews } = useFetchReviewsByUser();

  return (
    <Layout>
      <ReviewsContent id='reviews-content'>
        <div>

          <h2>Reviews</h2>
          <p>Confira aqui suas avaliações de livros que você leu e/ou abandonou!</p>

          <BoxesWrappers id="boxes-wrapper">
            {reviews.map((review: any) => (
              <BoxWrapper key={review.id} id="box-wrapper">
                <img src={review.thumbnailUrl ?? review.smallThumbnailUrl} alt={review.title} />
                <ReviewDetails id="review-details">
                  <TitleRating>
                    <p>{review.title}</p>
                    <Icons>
                      <Rating
                        name="read-only"
                        value={review.rating} readOnly
                        icon={<StarRoundedIcon fontSize="inherit" />}
                        emptyIcon={<StarBorderRoundedIcon style={{ opacity: 0.55 }} />}
                      />
                      {/* to-do - editar review */}
                      <a>
                        <EditRoundedIcon
                          sx={{ fill: `${Theme.colors.pink}` }} />
                      </a>

                    </Icons>
                  </TitleRating>
                  <p>{review.review}</p>
                  <ReviewDate>{formatDate(review.createdAt)}</ReviewDate>
                </ReviewDetails>
              </BoxWrapper>
            ))}
          </BoxesWrappers>
        </div>
      </ReviewsContent>
    </Layout>

  );
}
