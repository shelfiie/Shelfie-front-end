import { useEffect, useState } from "react"
import { UserService } from "../services/UserService"
import { StatusCode } from "../client/IHttpClient";
import { BookService } from "../services/BookService";
const useFetchReviewsByUser = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const userService = new UserService();
    const bookService = new BookService();

    useEffect(() => {
        const fetchReviewsByUser = async () => {
            const response = await userService.fetchAllReviewsMyReviews();
            if (response.statusCode === StatusCode.Ok) {

                const reviews = response.body;

                const combinedReviews = await Promise.all(reviews.map(async (review: any) => {
                    const booksDetailsResponse = await bookService.fetchBookById(review.bookId);
                    if (booksDetailsResponse.statusCode === StatusCode.Ok) {
                        return { ...review, ...booksDetailsResponse.body }
                    } else {
                        return {
                            ...response,
                            reject: 'Ocorreu um erro no caminho.'
                        }
                    }
                }))
                setReviews(combinedReviews);
                return combinedReviews;
            }
        }
        fetchReviewsByUser();
    }, [])
    return { reviews }
}
export { useFetchReviewsByUser }