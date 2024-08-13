import { useEffect, useState } from "react";
import { BookService } from "../services/BookService";
import { StatusCode } from "../client/IHttpClient";

const useFetchLikesQuantityByReview = (reviewId: string) => {
    const [likesQuantity, setLikesQuantity] = useState<number>(0);
    const bookService = new BookService();

    const fetchLikesQuantity = async () => {
        const response = await bookService.fetchLikesQuantityByReviewId(reviewId);
        if (response.statusCode === StatusCode.Ok) {
            setLikesQuantity(response.body.quantity);
        }
    };

    useEffect(() => {
        fetchLikesQuantity();
    }, [reviewId]);

    return { likesQuantity };
}

export { useFetchLikesQuantityByReview };