import { useCallback, useEffect, useState } from "react";
import { BookData } from "../../types/bookData";
import { BookService } from "../services/BookService";
import { StatusCode } from "../client/IHttpClient";

const useFetchReviewsByGoogleId = (googleId: BookData['googleId']) => {
    const [reviews, setReviews] = useState<BookData['reviews'][]>();
    const [loading, setLoading] = useState<boolean>(false);
    const bookService = new BookService();

    const fetchReviewsByGoogleId = useCallback(async () => {
        setLoading(true);
        const response = await bookService.fetchReviewsByBookId(googleId);
        if (response.statusCode === StatusCode.Ok) {
            setReviews(response.body);
            setLoading(false);
            console.log('response',response)
            return response;
        }
    }, [reviews]);
    useEffect(() => {
        fetchReviewsByGoogleId();
    }, [])
    return { reviews, loading, refetchReviews: fetchReviewsByGoogleId }
}

export { useFetchReviewsByGoogleId }