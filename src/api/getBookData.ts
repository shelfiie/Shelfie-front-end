import axios, { AxiosPromise } from "axios";
import { config } from "./config";

const GOOGLE_API = config.googleApiSearchByTitle;
const GOOGLE_API_ID = config.googleApiSearchById;
const ORDER_BY = config.googleApiOrderByRelevance;
const PRINT_TYPE = config.googleApiPrintType;
const LANG_RESTRICT = config.googleApiLanguageRestrict;
const MAX_RESULTS = config.googleApiMaxResults;

function replaceChars(str: string): string {
    return str.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br>/g, '').replace("'", " ").replace(/<b>/g, '').replace(/<\/b>/g, '');
}

// Função para buscar os dados do livro em tempo real
export async function fetchBookDataByTitle(search: string): AxiosPromise<bookData> {
    const q = search.split(' ').join('+');
    const response = await axios.get(GOOGLE_API + q + ORDER_BY + PRINT_TYPE + LANG_RESTRICT + MAX_RESULTS);
    
    return response.data;
}

export async function fetchBookById(id: string): Promise<bookData> {
    const { data } = await axios.get(GOOGLE_API_ID + id);

    const { volumeInfo, id: googleId } = data;
    const { title, authors, publisher, publishedDate, description, industryIdentifiers, pageCount, imageLinks } = volumeInfo;

    const thumbnail = imageLinks
        ? imageLinks.large
            ? imageLinks.large
            : imageLinks.thumbnail
        : 'https://centrodametropole.fflch.usp.br/sites/centrodametropole.fflch.usp.br/files/user_files/livros/imagem/capa-no-book-cover.png';

    const bookDetails: bookData = {
        googleId,
        title,
        authors,
        publisher,
        publishedDate: new Date(publishedDate).toLocaleDateString('pt-BR', { year: 'numeric' }),
        description: description ? replaceChars(description) : "Sem descrição",
        isbn10: industryIdentifiers[0].identifier,
        isbn13: industryIdentifiers[1].identifier,
        thumbnail,
        pageCount
    }

    return bookDetails;
}
