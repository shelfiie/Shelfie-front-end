import { stringify } from "querystring";
import { GoogleHttpClient } from "../GoogleHttpClient";
import { HttpRequest, HttpResponse, StatusCode } from "../IHttpClient";


export class GoogleBooksService {
    private client: GoogleHttpClient;

    constructor() {
        this.client = new GoogleHttpClient();
    }

    // private buildUrl({ base, params }: { base: string, params: Record<string, string> }): string {
    //     console.log(params);
    //     if (params) {
    //         const queryString = Object.entries(params)
    //             .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    //             .join('&');
    //         return `${base}${queryString}`;
    //     } else {
    //         return base;
    //     }
    // }

    private buildParams(params: Record<string, string>): string {
        if (params) {
            const query = Object.entries(params)
                .map(([key, value]) => `${key}=${value as string}`)
                .join('&')
                .replace(/ /g, '+');
            return `?${query}`;
        } else return '';
    }

    async fetchBooksByParams(params: Record<string, string>): Promise<HttpResponse<any>> {
        const base = '/books/v1/volumes';

        const searchParams = this.buildParams(params);
        const response = await this.client.get({ url: base, search: searchParams });

        if (response.statusCode === StatusCode.Ok) {
            return response;
        } else {
            return response;
        }
    }
}
