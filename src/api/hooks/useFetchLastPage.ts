import { useEffect, useState } from "react";
import { BookService } from "../services/BookService";
import { BookData } from "../../types/bookData";

const useFetchLastPage = (bookId: BookData['bookId']) => {
    const service = new BookService();
    const [maxPage, setMaxPage] = useState<BookData['pageCount']>(0);
    const [actualPage, setActualPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchLastPage = async () => {
            setLoading(true);
            const bookPage = await service.fetchBookById(bookId);
            if (bookPage.statusCode === 200) setMaxPage(bookPage.body.pages);

            const lastPage = await service.fetchLastPage(bookId);
            if (lastPage.statusCode === 200) setActualPage(lastPage.body.page);

            setLoading(false);
        };

        fetchLastPage();
    }, []);
    return { maxPage, actualPage, loading };
}

export { useFetchLastPage };