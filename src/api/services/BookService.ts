import { BookData } from "../../types/bookData";
import { HttpResponse, StatusCode } from "../client/IHttpClient";
import { ShelfieHttpClient } from "../client/ShelfieHttpClient";

export class BookService {
    private client: ShelfieHttpClient;

    constructor() {
        this.client = new ShelfieHttpClient();
    }

    async postBookStatus({ googleId, status }: BookData) : Promise<HttpResponse<any>> {
        const newStatus = (status ?? '').toUpperCase().replace(' ', '_');

        const base = `/api/mybooks/${googleId}/${newStatus}`;

        const response = await this.client.post({ url: base });
        console.log(response);
        return response;
    }

    async postProgression({ progression, id }: BookData) : Promise<HttpResponse<any>> {
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

}