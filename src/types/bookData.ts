export enum BookStatus {
    DEFAULT = 'SELECIONAR',
    LENDO = "LENDO",
    LIDO = "LIDO",
    QUERO_LER = "QUERO_LER",
    ABANDONADO = "ABANDONADO",
}

export enum ReportStatus {
    TODOS = 'TODOS',
    PENDENTE = 'PENDENTE',
    RESOLVIDO = 'RESOLVIDO',
    RECUSADO = 'RECUSADO'
}


type BookData = {
    id?: string;
    bookId?: string;
    googleId?: string;
    title?: string;
    enabled?: boolean;
    authors?: string[] | string;
    publisher?: string;
    publishedDate?: string;
    description?: string;
    isbn10?: string;
    isbn13?: string;
    thumbnailUrl?: string;
    smallThumbnailUrl?: string;
    //paginas que o livro tem
    pageCount?: number;
    quantity?: {
        review?: number;
        favorite?: number;
        paginometer?: number;
        lido?: number;
        lendo?: number;
        queroLer?: number;
        abandonado?: number;
    };
    reviews?: {
        googleId?: BookData['googleId'];
        id?: string;
        createdAt?: string;
        bookId?: BookData['bookId'];
        thumbnailUrl?: BookData['thumbnailUrl'];
        smallThumbnailUrl?: BookData['smallThumbnailUrl'];
        title?: BookData['title'];
        rating?: number;
        review?: string;
    }
    bookStatus?: BookStatus;
    progressions?: {
        id?: string;
        description: BookData['description']
        bookId: BookData['bookId'];
        googleId: BookData['googleId'];
        thumbnailUrl: BookData['thumbnailUrl'];
        smallThumbnailUrl: BookData['smallThumbnailUrl'];
        title: BookData['title'];
        pageCount: BookData['pageCount']
        percentage: number;
        status: BookStatus;
        commentary: string;
        porcentage?: number;
        page: number;
        createdAt: string;
    }
    report?: {
        reportId?: string;
        userId?: string;
        reviewId?: string;
        bookId?: BookData['bookId'];
        review?: string;
        reportStatus?: ReportStatus;
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