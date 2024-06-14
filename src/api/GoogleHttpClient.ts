import axios, { AxiosInstance } from "axios";
import { HttpRequest, HttpResponse } from "./IHttpClient";
import { IGoogleHttpClient } from "./IHttpClient";

export class GoogleHttpClient implements IGoogleHttpClient {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "https://www.googleapis.com",
            headers: { "Content-Type": "application/json" },
        });
    }

    async get<T>({ url, search }: HttpRequest<T>): Promise<HttpResponse<T>> {
        const response = await this.axiosInstance.get<T>(url, search);
        return {
            statusCode: response.status,
            body: response.data as T | undefined
        };
    }

}