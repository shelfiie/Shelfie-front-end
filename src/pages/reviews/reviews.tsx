import { Layout } from "../layout/layout"
import { ReviewsContent } from "./reviews-box.styles";
import { useFetchReviewsByUser } from "../../api/hooks/useFetchReviewsByUser";
import { ReviewsCard } from "./reviews-card";
import { ReviewsSkeleton } from "./reviews-skeleton";
import { NoItemsFound } from "../../components/globals/NoItemsFound";

export const Reviews = () => {
  const { reviews, loading, refetchReviews } = useFetchReviewsByUser();

  return (
    <Layout>
      <ReviewsContent id='reviews-content'>
          <div>
            <h2>Reviews</h2>
            <p>Confira aqui suas avaliações de livros que você leu e/ou abandonou!</p>
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
      </ReviewsContent>
    </Layout>

  );
}
