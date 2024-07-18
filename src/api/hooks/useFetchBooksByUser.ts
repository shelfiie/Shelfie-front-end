import { useEffect, useState } from "react";
import { BookService } from "../services/BookService";
import { BookData, BookStatus } from "../../types/bookData";
import { StatusCode } from "../client/IHttpClient";

const useFetchBooksByUser = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [allBooks, setAllBooks] = useState<BookData[]>([]);
    const [lendo, setLendo] = useState<BookData[]>([]);
    const [lidos, setLidos] = useState<BookData[]>([]);
    const [queroler, setQueroler] = useState<BookData[]>([]);
    const [abandonados, setAbandonados] = useState<BookData[]>([]);

    const bookService = new BookService();

    useEffect(() => {
        const fetchAllBooksByUser = async () => {
            setIsLoading(true);

            const response = await bookService.fetchBooksByUser();
            setAllBooks(response.body.filter((item: any) => item.enabled === true));

            await fetchBooksByStatus(BookStatus.LENDO, setLendo);
            await fetchBooksByStatus(BookStatus.LIDO, setLidos);
            await fetchBooksByStatus(BookStatus.QUERO_LER, setQueroler);
            await fetchBooksByStatus(BookStatus.ABANDONADO, setAbandonados);

            setIsLoading(false);
            return response;
        }

        const fetchBooksByStatus = async (status: BookStatus, setState: React.Dispatch<React.SetStateAction<BookData[]>>) => {
            const response = await bookService.fetchBooksByStatus(status);
            if (response.statusCode === StatusCode.Ok && response.body) {
                setState(response?.body?.filter((item : any) => item.enabled === true));
            }
        };
        fetchAllBooksByUser();
    }, [])
    return { isLoading, allBooks, lendo, lidos, queroler, abandonados };
}

export { useFetchBooksByUser };