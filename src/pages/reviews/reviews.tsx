import { Layout } from "../layout/layout"
import { ReviewsContent } from "./reviews-box.styles";
import { useFetchReviewsByUser } from "../../api/hooks/useFetchReviewsByUser";
import { ReviewsCard } from "./reviews-card";
import { ReviewsSkeleton } from "./reviews-skeleton";
import { NoItemsFound } from "../../components/globals/NoItemsFound";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { TabListStyle } from "../home/home.style";
import { Tab } from "@mui/material";

export const Reviews = () => {
  const { reviews, loading, refetchReviews } = useFetchReviewsByUser();
  // const { likedReviews } = useFetchLikedReview();
  const [value, setValue] = useState('1');

  return (
    <Layout>
      <ReviewsContent id='reviews-content'>
        <TabContext value={value}>
          <div>
            <h2>Reviews</h2>
            <p>Confira aqui suas avaliações de livros que você leu e/ou abandonou!</p>
            <TabList sx={TabListStyle} onChange={(_event, newValue) => setValue(newValue)} aria-label="simple tabs example">
              <Tab label="Todos" value='1' />
              <Tab label="Favoritos" value='2' />
            </TabList>
          </div>
        {loading ? (
          <ReviewsSkeleton />
        ) : (
          reviews?.length ?? 0 > 0 ?
            <div id='reviews-wrapper'>
              {reviews?.map((review) => (
                <ReviewsCard refetchReviews={refetchReviews} key={review?.id} review={review} isEditable={true} isLikable={true} />
              ))}
            </div> : <NoItemsFound>Você não tem livros avaliados!</NoItemsFound>
        )}
          <TabPanel value='1'>
            {loading ? (
              <ReviewsSkeleton />
            ) : (
              reviews?.length ?? 0 > 0 ?
                <div id='reviews-wrapper'>
                  {reviews?.map((review) => (
                    <ReviewsCard
                      refetchReviews={refetchReviews}
                      key={review?.id}
                      review={review}
                      isEditable={true}
                      isLikable={true} />
                  ))}
                </div> : <NoItemsFound>Você não tem livros avaliados!</NoItemsFound>
            )}
          </TabPanel>

          {/* <TabPanel value='2'>
            {loading ? (
              <ReviewsSkeleton />
            ) : (
              likedReviews?.length ?? 0 > 0 ?
                <div id='reviews-wrapper'>
                  {likedReviews?.map((likedReview) => (
                    <ReviewsCard
                      refetchReviews={refetchReviews}
                      key={likedReview?.id}
                      review={likedReview}
                      isEditable={false}
                      isLikable={true} />
                  ))}
                </div> : <NoItemsFound>Você não tem livros favoritados!</NoItemsFound>
            )}
          </TabPanel> */}
        </TabContext>

      </ReviewsContent>
    </Layout>

  );
}
