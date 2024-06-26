import { HttpRequest, HttpResponse, IHttpClient } from "../IHttpClient";

export class ShelfieService implements IHttpClient{
    
    get<T>({ url, search }: HttpRequest<T>): Promise<HttpResponse<T>> {
        throw new Error("Method not implemented.");
    }
    post<T>({ url, body }: HttpRequest<T>): Promise<HttpResponse<T>> {
        throw new Error("Method not implemented.");
    }
    put<T>({ url, body }: HttpRequest<T>): Promise<HttpResponse<T>> {
        throw new Error("Method not implemented.");
    }

}