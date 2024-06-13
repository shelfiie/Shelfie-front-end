import axios, { AxiosInstance } from "axios";
import { HttpRequest, HttpResponse } from "./IHttpClient";
import { IGoogleHttpClient } from "./IHttpClient.1";

export class GoogleHttpClient implements IGoogleHttpClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "",
      headers: { "Content-Type": "application/json" },
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

}