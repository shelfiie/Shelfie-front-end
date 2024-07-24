import { useEffect, useState } from "react";
import { BookService } from "../services/BookService";
import { BookData, BookStatus } from "../../types/bookData";
import { StatusCode } from "../client/IHttpClient";
import { set } from "react-hook-form";

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

            const response = await bookService.fetchCombinedBooksByUser();

            if(response.statusCode === StatusCode.Ok) {
                setAllBooks(response.body);
                fetchBooksByStatus(response.body)
            } 

            setIsLoading(false);
            return response;
        }

        const fetchBooksByStatus = async (books: BookData[]) => {
            setLendo(books.filter(book => book.bookStatus === BookStatus.LENDO && book.enabled));
            setLidos(books.filter(book => book.bookStatus === BookStatus.LIDO && book.enabled));
            setQueroler(books.filter(book => book.bookStatus === BookStatus.QUERO_LER && book.enabled));
            setAbandonados(books.filter(book => book.bookStatus === BookStatus.ABANDONADO && book.enabled));
        };
        fetchAllBooksByUser();
    }, [])
    return { isLoading, allBooks, lendo, lidos, queroler, abandonados };
}

export { useFetchBooksByUser };