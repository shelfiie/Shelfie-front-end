import { useCallback, useEffect, useState } from "react";
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
    const [favoritos, setFavoritos] = useState<BookData[]>([]);

    const bookService = new BookService();

    const fetchAllBooksByUser = useCallback(async () => {
        setIsLoading(true);

        const response = await bookService.fetchCombinedBooksByUser();

        if (response.statusCode === StatusCode.Ok) {
            setAllBooks(response.body);
            fetchBooksByStatus(response.body)
            fetchFavoriteBooks(response.body);
        }

        setIsLoading(false);
        return response;
    }, [bookService]);

    const fetchBooksByStatus = useCallback(async (books: BookData[]) => {
        setLendo(books.filter(book => book.bookStatus === BookStatus.LENDO && book.enabled));
        setLidos(books.filter(book => book.bookStatus === BookStatus.LIDO && book.enabled));
        setQueroler(books.filter(book => book.bookStatus === BookStatus.QUERO_LER && book.enabled));
        setAbandonados(books.filter(book => book.bookStatus === BookStatus.ABANDONADO && book.enabled));
    }, []);

    const fetchFavoriteBooks = useCallback(async (books : BookData[]) => {
        const response = await bookService.fetchFavoriteBooks();
        if (response.statusCode === StatusCode.Ok) {
            const favoriteBookIds = response.body.map((book: BookData) => book.bookId);
            const favoriteBooks = books.filter(book => favoriteBookIds.includes(book.bookId));
            setFavoritos(favoriteBooks);
        }
    }, []);

    useEffect(() => {
        fetchAllBooksByUser();
    }, [])
    return { isLoading, allBooks, lendo, lidos, queroler, abandonados, favoritos };
}

export { useFetchBooksByUser };