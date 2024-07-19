import { useEffect, useState } from "react";
import { BookData } from "../../types/bookData";
import { GoogleBooksService } from "../services/GBookService";
import { StatusCode } from "../client/IHttpClient";

const useGBookById = (id: string) => {
    const [book, setBook] = useState<BookData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const filterDescription = (description: string) => {
        return description.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br>/g, '').replace("'", " ").replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<i>/g, '').replace(/<\/i>/g, '');
    }

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
                    smallThumbnail: response.body.volumeInfo.imageLinks?.smallThumbnail ?? '',
                    thumbnail: response.body.volumeInfo.imageLinks?.thumbnail ?? ''
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