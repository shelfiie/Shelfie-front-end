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
                        const data = {
                            ...review,
                            googleId: booksDetailsResponse.body.googleId,
                            title: booksDetailsResponse.body.title,
                            smallThumbnailUrl: booksDetailsResponse.body.smallThumbnailUrl,
                            thumbnailUrl: booksDetailsResponse.body.thumbnailUrl,
                        }
                        return { ...review, ...data }
                    } else {
                        return {
                            ...response,
                            reject: 'Ocorreu um erro no caminho.'
                        }
                    }
                }
            }))
            combinedReviews.sort((a, b) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() });
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