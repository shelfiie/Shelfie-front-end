import { Layout } from "../layout/layout"
import { ReviewsContent } from "./reviews-box.styles";
import { useFetchReviewsByUser } from "../../api/hooks/useFetchReviewsByUser";
import { ReviewsCard } from "./reviews-card";
import { ReviewsSkeleton } from "./reviews-skeleton";

export const Reviews = () => {
  const { reviews, loading } = useFetchReviewsByUser();

  return (
    <Layout>
      <ReviewsContent id='reviews-content'>
        <div>

          <h2>Reviews</h2>
          <p>Confira aqui suas avaliações de livros que você leu e/ou abandonou!</p>

          {loading ? (
            <ReviewsSkeleton />
          ) : (
            <ReviewsCard review={reviews ?? []} />
          )}

        </div>
      </ReviewsContent>
    </Layout>

  );
}
