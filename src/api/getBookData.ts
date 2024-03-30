import axios, { AxiosPromise } from "axios";

// q = query (search term)
const GOOGLE_API_URL = "https://www.googleapis.com/books/v1/volumes?q="


// Função para buscar os dados do livro em tempo real
export async function fetchBookData(search: string): AxiosPromise<bookData> {
    const q = search.split(' ').join('+');
    const response = await axios.get(GOOGLE_API_URL + q);
    return response.data;
}
