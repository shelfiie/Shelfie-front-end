import { useEffect, useState } from "react";
import { BookService } from "../services/BookService";
import { BookData } from "../../types/bookData";

const useFetchLastPage = (bookId : BookData['bookId']) => {
    const service = new BookService();
    const [maxPage, setMaxPage] = useState<BookData['pageCount']>(0);
    const [actualPage, setActualPage] = useState<number>(0);

    useEffect(() => {
        const fetchLastPage = async () => {
            const lastPage = await service.fetchLastPage(bookId);
            if (lastPage.statusCode === 200) {
                setActualPage(lastPage.body.page);
            } 
        };

        const fetchBookPage = async () => {
            const bookPage = await service.fetchBookById(bookId);
            if (bookPage.statusCode === 200) {
                setMaxPage(bookPage.body.pages);
            }
        }

        fetchLastPage();
        fetchBookPage();
    }, []);
    return { maxPage, actualPage };
}

export { useFetchLastPage };