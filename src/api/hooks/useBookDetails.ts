import { useEffect, useState } from "react";
import { BookData } from "../../types/bookData";
import { BookService } from "../services/BookService";
import { StatusCode } from "../client/IHttpClient";

const useBookDetails = (googleId: BookData['googleId']) => {
    const [page, setPage] = useState<number>(0);
    const [bookStatus, setBookStatus] = useState<BookData['bookStatus']>();
    const [bookId, setBookId] = useState<BookData['bookId']>();
    const service = new BookService();

    const fetchMybook = async () => {
        const myBook = await service.fetchBooksByGoogleId(googleId);
        if (myBook.statusCode === StatusCode.Ok) {
            setBookStatus(myBook.body.bookStatus);
            setBookId(myBook.body.bookId);
            const lastPage = await service.fetchLastPage(myBook.body.bookId);
            setPage(lastPage.body.page);
        } else return;
    };

    useEffect(() => {
        fetchMybook();
    }, [googleId]);

    return { page, bookStatus, bookId, refetchBookDetails : fetchMybook, refetchBookId: bookId };
}

export { useBookDetails };