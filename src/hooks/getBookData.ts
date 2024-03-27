import axios, { AxiosPromise } from "axios";

// q = query (search term)
const GOOGLE_API_URL = "https://www.googleapis.com/books/v1/volumes?q="

var q = [""];

export async function fetchBookData(search: string) : AxiosPromise<bookData[]> {
    for (var i = 0; i < search.length; i++) {
        console.log("search[i]: " + search[i]);
        q[i] = search[i].replace(" ", "+");
    }
    console.log("q depois do for " + q);
    try {
        console.log("req " + GOOGLE_API_URL + q);
        const response = axios.get(GOOGLE_API_URL + q);
        console.log(JSON.stringify(response));
        return response;
    } catch (error) {
        throw (error);
    }
}