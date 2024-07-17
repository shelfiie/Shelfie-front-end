export enum BookStatus {
    LENDO = "LENDO",
    LIDO = "LIDO",
    QUERO_LER = "QUERO_LER",
    ABANDONADO = "ABANDONADO",
}

type BookData = {
    // myBooksId
    id?: string;
    bookId?: string;
    googleId?: string;
    title?: string;
    enabled?: boolean;
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
    bookStatus?: BookStatus;
    progression?: {
        commentary: string;
        pages: number;
    }
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