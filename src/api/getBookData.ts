import axios, { AxiosPromise } from "axios";
import { config } from "./config";

const GOOGLE_API = config.googleApiSearchByTitle;
const GOOGLE_API_ID = config.googleApiSearchById;
const ORDER_BY = config.googleApiOrderByRelevance;
const PRINT_TYPE = config.googleApiPrintType;
const LANG_RESTRICT = config.googleApiLanguageRestrict;
const MAX_RESULTS = config.googleApiMaxResults;

function replaceChars(str: string): string {
    return str.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br>/g, '').replace("'", " ");
}

// Função para buscar os dados do livro em tempo real
export async function fetchBookDataByTitle(search: string): AxiosPromise<bookData> {
    const q = search.split(' ').join('+');
    const response = await axios.get(GOOGLE_API + q + ORDER_BY + PRINT_TYPE + LANG_RESTRICT + MAX_RESULTS);
    
    return response.data;
}

export async function fetchBookById(id: string):Promise<bookData> {
    const response = await axios.get(GOOGLE_API_ID + id);
    const bookDetails:bookData ={
        googleId: response.data.id,
        title: response.data.volumeInfo.title,
        authors: response.data.volumeInfo.authors,
        publisher: response.data.volumeInfo.publisher,
        publishedDate: new Date(response.data.volumeInfo.publishedDate).toLocaleDateString('pt-BR', { year: 'numeric' }),
        description: replaceChars(response.data.volumeInfo.description),
        isbn10: response.data.volumeInfo.industryIdentifiers[0].identifier,
        isbn13: response.data.volumeInfo.industryIdentifiers[1].identifier,
        thumbnail: response.data.volumeInfo.imageLinks.large,
        pageCount: response.data.volumeInfo.pageCount
    }

    return bookDetails;
}
