import { Layout } from "../layout"
import { Pagination, Rating } from "@mui/material";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { BoxesWrappers, BoxWrapper, Icons, ReviewDate, ReviewDetails, ReviewsContent, TitleRating } from "./reviews-box.styles";
import { useFetchReviewsByUser } from "../../api/hooks/useFetchReviewsByUser";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Theme } from "../../styles/theme";
import { useState } from "react";
import { formatDate } from "../../utils/filters";

export const Reviews = () => {
  const { reviews } = useFetchReviewsByUser();
  const [page, setPage] = useState(1);

  const charsPerPage = 1800; // Defina um limite de caracteres por página

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => setPage(value);

  const getPagedReviews = (reviews: any[], charsPerPage: number) => {
    let currentPageChars = 0;
    const pages: any[][] = [[]];

    reviews.forEach((review) => {
      const reviewLength = review.title.length + review.review.length + 100; // Adicione 100 caracteres para margem
      if (currentPageChars + reviewLength > charsPerPage) {
        pages.push([review]);
        currentPageChars = reviewLength;
      } else {
        pages[pages.length - 1].push(review);
        currentPageChars += reviewLength;
      }
    });

    return pages;
  };

  const paginatedReviews = getPagedReviews(reviews, charsPerPage);

  return (
    <Layout>
      <ReviewsContent id='reviews-content'>
        <div>

          <h2>Reviews</h2>
          <p>Confira aqui suas avaliações de livros que você leu e/ou abandonou!</p>

        <BoxesWrappers id="boxes-wrapper">

          {paginatedReviews[page - 1].map((review: any) => (
            console.log(review),
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
        <Pagination
          sx={{ alignSelf: 'center' }}
          count={paginatedReviews.length}
          page={page}
          onChange={(event, newPage) => handlePageChange(event, newPage)}
          color="primary"
        />
      </ReviewsContent>
    </Layout>

  );
}
