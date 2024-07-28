import { useEffect, useState } from "react";
import { BookData } from "../../types/bookData";
import { GoogleBooksService } from "../services/GBookService";
import { StatusCode } from "../client/IHttpClient";
import { filterDescription } from "../../utils/filterDescription";

const useGBookById = (id: string) => {
    const [book, setBook] = useState<BookData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            const gBookService = new GoogleBooksService();
            const response = await gBookService.fetchBookById(id);

            if (response.statusCode === StatusCode.Ok) {
                const data = {
                    googleId: response.body.id,
                    title: response.body.volumeInfo.title,
                    authors: response.body.volumeInfo.authors ?? 'Autor não informado',
                    publishedDate: new Date(response.body.volumeInfo.publishedDate).toLocaleDateString('pt-BR') ?? response.body.volumeInfo.publishedDate,
                    publisher: response.body.volumeInfo.publisher ?? 'Editora não informada',
                    isbn10: response.body.volumeInfo.industryIdentifiers?.find((identifier: { type: string; }) => identifier.type === 'ISBN_10')?.identifier ?? 'ISBN não informado',
                    isbn13: response.body.volumeInfo.industryIdentifiers?.find((identifier: { type: string; }) => identifier.type === 'ISBN_13')?.identifier ?? 'ISBN não informado',
                    description: filterDescription(response.body.volumeInfo.description) ?? 'Descrição não fornecida',
                    pageCount: response.body.volumeInfo.pageCount ?? 'Número de páginas não informado',
                    smallThumbnailUrl: response.body.volumeInfo.imageLinks?.smallThumbnail ?? '',
                    thumbnailUrl: response.body.volumeInfo.imageLinks?.thumbnail ?? ''
                }
                setBook(data);
            } else {
                setError(response.reject as string);
            }
            setLoading(false);
        };
        fetchBook();
    }, [id]);

    return { book, error, loading };
}
export { useGBookById }