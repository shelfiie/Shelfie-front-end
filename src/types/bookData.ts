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
    thumbnailUrl?: string;
    smallThumbnailUrl?: string;
    pageCount?: number;
    reviews? : {
        rating?: number;
        review?: string;
    }
    bookStatus?: BookStatus;
    progressions?: {
        bookId: BookData['bookId'];
        googleId: BookData['googleId'];
        thumbnailUrl: BookData['thumbnailUrl'];
        smallThumbnailUrl: BookData['smallThumbnailUrl'];
        title: BookData['title'];
        status: BookStatus;
        commentary: string;
        page: number;
        createdAt: string;
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
            smallThumbnailUrl?: string;
            thumbnailUrl?: string;
        }
    };
};

export type { BookData, BooksResultsType };