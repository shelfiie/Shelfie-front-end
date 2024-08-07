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

    }


    async get<T>({ url, search }: HttpRequest<T>): Promise<HttpResponse<T>> {
        if (search) {
            const response = await this.axiosInstance.get<T>(`${url}${search}&orderBy=relevance&langRestrict=pt&key=AIzaSyBl_t_8322eAhMntYmlQvpYFElrL9lbvxA`);
            return {
                statusCode: response.status as StatusCode,
                body: response.data as T | undefined
            };
        } else {
            const response = await this.axiosInstance.get<T>(url + '?key=AIzaSyBl_t_8322eAhMntYmlQvpYFElrL9lbvxA');
            return {
                statusCode: response.status as StatusCode,
                body: response.data as T | undefined
            };
        }
    }

}