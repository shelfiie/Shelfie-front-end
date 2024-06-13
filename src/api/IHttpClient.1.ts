import { HttpRequest, HttpResponse } from "./IHttpClient";


export interface IHttpClient {
    get<T>(url: HttpRequest<T>): Promise<HttpResponse<T>>;
    post<T>({ url, body, params }: HttpRequest<T>): Promise<HttpResponse<T>>;
    put<T>({ url, body, }: HttpRequest<T>): Promise<HttpResponse<T>>;
}

export interface IGoogleHttpClient {
    get<T>(url: HttpRequest<T>) : Promise<HttpResponse<T>>;
}
