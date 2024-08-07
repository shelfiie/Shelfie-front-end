import { useCallback, useEffect, useState } from "react"
import { UserService } from "../services/UserService"
import { StatusCode } from "../client/IHttpClient";
import { BookService } from "../services/BookService";
import { BookData } from "../../types/bookData";

const useFetchReviewsByUser = () => {
    const [reviews, setReviews] = useState<BookData['reviews'][]>();
    const [loading, setLoading] = useState<boolean>(false);
    const userService = new UserService();
    const bookService = new BookService();

    const fetchReviewsByUser = useCallback(async () => {
        setLoading(true);
        const response = await userService.fetchAllReviewsMyReviews();
        if (response.statusCode === StatusCode.Ok) {

            const reviews = response.body;

            const combinedReviews = await Promise.all(reviews.map(async (review: BookData['reviews']) => {
                if (review) {
                    const booksDetailsResponse = await bookService.fetchBookById(review.bookId);
                    if (booksDetailsResponse.statusCode === StatusCode.Ok) {
                        return { ...review, ...booksDetailsResponse.body }
                    } else {
                        return {
                            ...response,
                            reject: 'Ocorreu um erro no caminho.'
                        }
                    }
                }
            }))
            setReviews(combinedReviews);
            setLoading(false);
            return combinedReviews;
        }
    }, [reviews]);
    useEffect(() => {
        fetchReviewsByUser();
    }, [])
    return { reviews, loading, refetchReviews: fetchReviewsByUser }
}
export { useFetchReviewsByUser }