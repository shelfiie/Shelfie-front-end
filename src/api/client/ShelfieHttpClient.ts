import axios, { AxiosInstance } from "axios";
import { HttpRequest, HttpResponse } from "./IHttpClient";
import { IHttpClient } from "./IHttpClient";

export class ShelfieHttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://159.203.106.163:8080",
      headers: { "Content-Type": "application/json" },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('@Auth:token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    })

    this.axiosInstance.defaults.insecureHTTPParser = false;
  }

  async put<T>({ url, body }: HttpRequest<T>): Promise<HttpResponse<T>> {
    return this.axiosInstance.put<T>(url, body)
      .then((response) => {
        return {
          statusCode: response.status,
          body: response.data,
        };
      });
  }

  async get<T>({ url }: HttpRequest<T>): Promise<HttpResponse<T>> {
    return await this.axiosInstance.get<T>(url)
      .then(response => {
        return {
          statusCode: response.status,
          body: response.data
        };
      });
  }
  async post<T>({ url, body }: HttpRequest<T>): Promise<HttpResponse<T>> {
    return await this.axiosInstance.post<T>(url, body)
      .then(response => {
        return {
          statusCode: response.status,
          body: response.data
        };
      });
  }

}