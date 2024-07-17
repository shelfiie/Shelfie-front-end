import { BookData } from "../../types/bookData";
import { HttpResponse, StatusCode } from "../client/IHttpClient";
import { ShelfieHttpClient } from "../client/ShelfieHttpClient";

export class BookService {
    private client: ShelfieHttpClient;

    constructor() {
        this.client = new ShelfieHttpClient();
    }

    async postBookStatus({ googleId, bookStatus }: BookData): Promise<HttpResponse<any>> {
        const newStatus = (bookStatus ?? '').toUpperCase().replace(' ', '_');

        const base = `/api/mybooks/${googleId}/${newStatus}`;

        const response = await this.client.post({ url: base });
        console.log(response);
        return response;
    }

    async postProgression({ progression, id }: BookData): Promise<HttpResponse<any>> {
        const base = `/api/mybooks/reading`;

        const data = {
            commentary: progression?.commentary,
            pages: progression?.pages,
            myBooksId: id
        }

        const response = await this.client.post({
            url: base,
            body: data
        });

        if (response.statusCode === StatusCode.Created) {
            return {
                ...response,
                resolve: 'Progressão salva com sucesso!',
            };
        } else return {
            ...response,
            reject: 'Erro ao salvar progressão',
        }
    }

    async fetchBooksByUser(): Promise<HttpResponse<any>> {
        const base = '/api/mybooks';

        const response = await this.client.get({ url: base });

        if (response.statusCode === StatusCode.Ok) {
            return {
                statusCode: StatusCode.Ok,
                body: response.body,
                resolve: 'Sucesso ao buscar livros',
            }

        } else {
            return {
                ...response,
                reject: 'Erro ao buscar livros',
            };
        }
    }

    async fetchBooksByStatus(status: string): Promise<HttpResponse<any>> {
        const base = `/api/mybooks/status/${status}`;

        const response = await this.client.get({ url: base });

        if (response.statusCode === StatusCode.Ok) {
            return {
                statusCode: StatusCode.Ok,
                body: response.body,
                resolve: 'Sucesso ao buscar livros',
            }

        } else {
            return {
                ...response,
                reject: 'Erro ao buscar livros',
            };
        }
    }

    disableBook = async (myBooksId: string): Promise<HttpResponse<any>> => {
        const base = `/api/mybooks/${myBooksId}/disable`;

        const response = await this.client.put({ url: base });

        if (response.statusCode === StatusCode.Ok) {
            return {
                statusCode: StatusCode.Ok,
                resolve: 'Livro desativado com sucesso',
            }
        } else {
            return {
                ...response,
                reject: 'Erro ao desativar livro',
            }
        }
    }

}