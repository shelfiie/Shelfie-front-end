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

  }

  async put<T>({ url, body }: HttpRequest<T>): Promise<HttpResponse<T>> {
    return this.axiosInstance.put<T>(url, body)
      .then((response) => {
        return {
          statusCode: response.status,
          body: response.data,
        };
      }).catch(error => {
        if (error.response?.status >= 500){
          return {
            statusCode: 500,
            reject: error.response?.data.detail,
          };
        } else return {
          statusCode: error.response?.status,
          reject: error.response?.data.description || error.response?.data.detail,
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
      }).catch(error => {
        if (error.response?.status >= 500){
          return {
            statusCode: 500,
            reject: 'Erro interno no servidor',
          };
        } else {
          return {
            statusCode: error.response?.status,
            reject: error.response?.data.description || error.response?.data.detail,
          };
        }
      });
  }
  
  async post<T>({ url, body }: HttpRequest<T>): Promise<HttpResponse<T>> {
    return await this.axiosInstance.post<T>(url, body)
      .then(response => {
        return {
          statusCode: response.status,
          body: response.data,
        };
      }).catch(error => {
        if (error.response?.status >= 500){
          return {
            statusCode: 500,
            reject: error.response?.data.detail || error.response.data.description,
          };
        } else return {
          statusCode: error.response?.status,
          reject: error.response?.data.description,
        };
      });
  }

  async delete<T>({ url }: HttpRequest<T>): Promise<HttpResponse<T>> {
    return await this.axiosInstance.delete<T>(url)
      .then(response => {
        return {
          statusCode: response.status,
          body: response.data,
        };
      }).catch(error => {
        if (error.response?.status >= 500){
          return {
            statusCode: 500,
            reject: error.response?.data.detail,
          };
        } else return {
          statusCode: error.response?.status,
          reject: error.response?.data.description,
        };
      });
  }
}
