/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleHttpClient } from "../client/GoogleHttpClient";
import { HttpResponse, StatusCode } from "../client/IHttpClient";

export class GoogleBooksService {
    private client: GoogleHttpClient;

    constructor() {
        this.client = new GoogleHttpClient();
    }

    private buildParams(params: Record<string, string>): string {
        if (params && Object.keys(params).length > 0){
            const query = Object.entries(params)
                .map(([key, value]) => `${key}=${value as string}`)
                .join('&')
                .replace(/ /g, '+');
            return `?${query}`;
        } else {
            return '';
        }
    }

    async fetchBooksByParams(params: Record<string, string>): Promise<HttpResponse<any>> {
        const base = '/books/v1/volumes';

        try {
            const searchParams = this.buildParams(params);
            const response = await this.client.get({ url: base, search: searchParams });

            if (response.statusCode === StatusCode.Ok) {
                return {
                    statusCode: StatusCode.Ok,
                    body: response.body,
                    resolve: 'Sucesso ao buscar livros',
                }

            } else {
                return response;
            }
        } catch (error) {
            throw new Error('Erro ao buscar livros');
        }

    }

    async fetchBookById(id: string): Promise<HttpResponse<any>> {
        const base = `/books/v1/volumes/${id}`;

        try {
            const response = await this.client.get({ url: base });
            if (response.statusCode === StatusCode.Ok) {
                return {
                    statusCode: StatusCode.Ok,
                    body: response.body,
                    resolve: 'Sucesso ao buscar livro',
                }

            } else {
                return response;
            }
        } catch (error) {
            return {
                statusCode: StatusCode.NotFound,
                body: null,
                resolve: 'Erro ao buscar livro',
            }
        }
    }
}
