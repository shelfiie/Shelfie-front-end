import { Layout } from "../layout/layout"
import { ReviewsContent, ReviewsWrapper } from "./reviews-box.styles";
import { useFetchReviewsByUser } from "../../api/hooks/useFetchReviewsByUser";
import { ReviewsCard } from "./reviews-card";
import { ReviewsSkeleton } from "./reviews-skeleton";
import { NoItemsFound } from "../../components/globals/NoItemsFound";

export const Reviews = () => {
  const { reviews, loading, refetchReviews } = useFetchReviewsByUser();

  return (
    <Layout>
      <ReviewsContent id='reviews-content'>

          <h2>Reviews</h2>
          <p>Confira aqui suas avaliações de livros que você leu e/ou abandonou!</p>

          {loading ? (
            <ReviewsSkeleton />
          ) : (
            reviews?.length ?? 0 > 0 ? 
            <ReviewsWrapper id='reviews-wrapper'>
              <ReviewsCard isEditable={true} review={reviews ?? []} />
            </ReviewsWrapper> : <NoItemsFound>Você não tem livros avaliados!</NoItemsFound>
          )}

      </ReviewsContent>
    </Layout >

  );
}
