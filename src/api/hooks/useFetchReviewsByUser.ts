import { useCallback, useEffect, useState } from "react"
import { UserService } from "../services/UserService"
import { StatusCode } from "../client/IHttpClient";
import { BookService } from "../services/BookService";
import { BookData } from "../../types/bookData";

const useFetchReviewsByUser = () => {
    const [reviews, setReviews] = useState<BookData['reviews'][]>();
    const [likedReviews, setLikedReviews] = useState<BookData['reviews'][]>();

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

    const fetchLikedReviews = useCallback(async () => {
        setLoading(true);
        const response = await userService.fetchMyLikedReviews();
        if (response.statusCode === StatusCode.Ok) {
            const likedReviews = response.body;

            const combinedReviews = await Promise.all(likedReviews.map(async (likedReview: any) => {
                if (likedReview) {
                    const reviewsDetails = await userService.fetchAllReviewsMyReviews();
                    const review = reviewsDetails.body.find((review: BookData['reviews']) => review?.id === likedReview?.reviewId);

                    if (review) {
                        const booksDetailsResponse = await bookService.fetchBookById(review.bookId);
                        if (booksDetailsResponse.statusCode === StatusCode.Ok) {
                            const data = {
                                ...review,
                                googleId: booksDetailsResponse.body.googleId,
                                title: booksDetailsResponse.body.title,
                                smallThumbnailUrl: booksDetailsResponse.body.smallThumbnailUrl,
                                thumbnailUrl: booksDetailsResponse.body.thumbnailUrl,
                            };
                            return { ...review, ...data };
                        } else {
                            return {
                                ...review,
                                reject: 'Ocorreu um erro no caminho.'
                            };
                        }
                    }
                }
                return likedReview;
            }));

            combinedReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setLikedReviews(combinedReviews);
            setLoading(false);
            return combinedReviews;
        }
    }, []);

    useEffect(() => {
        fetchLikedReviews();
        fetchReviewsByUser();
    }, [])
    return { reviews, likedReviews, loading, refetchReviews: fetchReviewsByUser }
}
export { useFetchReviewsByUser }