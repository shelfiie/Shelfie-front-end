import axios, { AxiosInstance } from "axios";
import { HttpRequest, HttpResponse, StatusCode } from "./IHttpClient";
import { IGoogleHttpClient } from "./IHttpClient";

export class GoogleHttpClient implements IGoogleHttpClient {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "https://www.googleapis.com",
            headers: { "Content-Type": "application/json" },
        })

        this.axiosInstance.interceptors.request.use((config) => {
            config.params = { key: import.meta.env.VITE_GOOGLE_API_KEY};
            return config;
        })
    }

    

    async get<T>({ url, search }: HttpRequest<T>): Promise<HttpResponse<T>> {
        const response = await this.axiosInstance.get<T>(url, { params: search });
        return {
            statusCode: response.status as StatusCode,
            body: response.data as T | undefined
        };
    }

}