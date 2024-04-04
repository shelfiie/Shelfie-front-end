import axios, { AxiosPromise } from "axios";
import { config } from "./config";

const GOOGLE_API = config.googleApiSearchByTitle;
const GOOGLE_API_ID = config.googleApiSearchById;
const ORDER_BY = config.googleApiOrderByRelevance;
const PRINT_TYPE = config.googleApiPrintType;
const LANG_RESTRICT = config.googleApiLanguageRestrict;

// Função para buscar os dados do livro em tempo real
export async function fetchBookDataByTitle(search: string): AxiosPromise<bookData> {
    const q = search.split(' ').join('+');
    const response = await axios.get(GOOGLE_API + q + ORDER_BY + PRINT_TYPE + LANG_RESTRICT);
    
    return response.data;
}

export async function fetchBookById(id: string): AxiosPromise<bookData> {
    const response = await axios.get(GOOGLE_API_ID + id);
    return response.data;
}
