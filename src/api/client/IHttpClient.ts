export enum StatusCode {
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500
}

export type HttpResponse<T> = {
    statusCode: StatusCode;
    body?: T;
    resolve?: string;
    reject?: string;
}

export type HttpRequest<T> = {
    url: string;
    search?: string;
    body?: T;
}

export interface IHttpClient {
    get<T>({ url, search }: HttpRequest<T>): Promise<HttpResponse<T>>;
    post<T>({ url, body }: HttpRequest<T>): Promise<HttpResponse<T>>;
    put<T>({ url, body }: HttpRequest<T>): Promise<HttpResponse<T>>;
}

export interface IGoogleHttpClient {
    get<T>({ url, search }: HttpRequest<T>): Promise<HttpResponse<T>>;
}