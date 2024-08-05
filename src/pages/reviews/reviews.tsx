import { Layout } from "../layout/layout"
import { ReviewsContent } from "./reviews-box.styles";
import { useFetchReviewsByUser } from "../../api/hooks/useFetchReviewsByUser";
import { ReviewsCard } from "./reviews-card";

export const Reviews = () => {
  const { reviews } = useFetchReviewsByUser();

  return (
    <Layout>
      <ReviewsContent id='reviews-content'>
        <div>

          <h2>Reviews</h2>
          <p>Confira aqui suas avaliações de livros que você leu e/ou abandonou!</p>

          <ReviewsCard review={reviews} />
        </div>
      </ReviewsContent>
    </Layout>

  );
}
