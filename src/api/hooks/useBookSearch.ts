import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GoogleBooksService } from '../services/GBookService';
import { BookData } from '../../types/bookData';

const useBookSearch = () => {
    const [searchParams] = useSearchParams();
    const filter = searchParams.get('filter') || 'Tudo';
    const search = searchParams.get('search') || '';

    const [books, setBooks] = useState<BookData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const buildQuery = (filter: string, search: string) => {
        if (!search) return '';
        switch (filter) {
            case 'Tudo':
                return search;
            case 'Título':
                return `intitle:${search}`;
            case 'Autor':
                return `inauthor:${search}`;
            case 'ISBN':
                return `isbn:${search}`;
            default:
                return search;
        }
    };

    useEffect(() => {
        const fetchBooks = async () => {
            setError(null);
            const googleBooksService = new GoogleBooksService();

            const query = buildQuery(filter, search);
            if (!query) return;

            let allBooks: BookData[] = [];
            const maxResults = 40; // Limite máximo por requisição na API

            try {
                if (search.length > 3) {
                    const response = await googleBooksService.fetchBooksByParams({ q: query, maxResults: maxResults.toString()});
                    setLoading(true);

                    if (response.statusCode !== 200) {
                        setError('Erro ao buscar livros');
                        setLoading(false);
                    }

                    const items = response.body.items || [];

                    const newBooks = items.map((item: any): BookData => ({
                        googleId: item.id,
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors ?? 'Autor não informado',
                        publishedDate: item.volumeInfo.publishedDate,
                        publisher: item.volumeInfo.publisher ?? 'Editora não informada',
                        isbn10: item.volumeInfo.industryIdentifiers?.find((identifier: { type: string; }) => identifier.type === 'ISBN_10')?.identifier ?? 'ISBN não informado',
                        isbn13: item.volumeInfo.industryIdentifiers?.find((identifier: { type: string; }) => identifier.type === 'ISBN_13')?.identifier ?? 'ISBN não informado',
                        description: item.volumeInfo.description ?? 'Descrição não fornecida',
                        pageCount: item.volumeInfo.pageCount ?? 'Número de páginas não informado',
                        smallThumbnail: item.volumeInfo.imageLinks?.smallThumbnail ?? '',
                        thumbnail: item.volumeInfo.imageLinks?.thumbnail ?? ''
                    }));

                    allBooks = [...allBooks, ...newBooks];
                    setBooks(allBooks);
                    setLoading(false);
                }
            } catch (error) {
                setError('Erro ao buscar livros');
            }
        };
        setTimeout(fetchBooks, 500);
    }, [filter, search]);

    return { books, loading, error };
};

export { useBookSearch };
