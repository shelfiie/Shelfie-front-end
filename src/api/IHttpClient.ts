enum StatusCode {
    OK = 200,
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
}

export type HttpRequest<T> = {
    url: string;
    params?: { [key: string] : string }
    body?: T;
}

export interface IHttpClient {
    get<T>(url: HttpRequest<T>): Promise<HttpResponse<T>>;
    post<T>({ url, body, params }: HttpRequest<T>): Promise<HttpResponse<T>>;
    put<T>({ url, body, params }: HttpRequest<T>): Promise<HttpResponse<T>>;
}