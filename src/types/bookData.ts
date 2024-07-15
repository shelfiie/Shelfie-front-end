type BookData = {
    id?: string;
    googleId: string;
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    isbn10?: string;
    isbn13?: string; 
    thumbnail?: string;
    smallThumbnail?: string;
    pageCount?: number;
    rating?: number;
    status?: string;
}

type BooksResultsType = {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[] | string;
        publishedDate: string;
        publisher?: string;
        isbn10?: string;
        isbn13?: string;
        description?: string;
        pageCount?: number;
        imageLinks?: {
            smallThumbnail?: string;
            thumbnail?: string;
        }
    };
};

export type { BookData, BooksResultsType };