import { UserData } from "../../types/userType";
import { HttpResponse } from "../client/IHttpClient";
import { ShelfieHttpClient } from "../client/ShelfieHttpClient";

export class UserService {
    private client: ShelfieHttpClient;

    constructor() {
        this.client = new ShelfieHttpClient();
    }

    async getUserData(): Promise<HttpResponse<unknown>> {
        const base = `/api/users/me`;
        const response = await this.client.get({ url: base });
        return response;
    }

    async editUser(data: UserData): Promise<HttpResponse<unknown>> {
        const base = `/api/users/${data.id}/update`;
        const response = await this.client.put({ url: base, body: data });
        if (response.statusCode !== 200) {
            return {
                ...response,
                reject: 'Erro ao atualizar usuário. Tente novamente mais tarde.',
            }
        }
        return response;
    }

    async disableUser(id: UserData['id']): Promise<HttpResponse<unknown>> {
        const base = `/api/users/${id}/disable`;
        const response = await this.client.put({ url: base });
        return {
            ...response,
            resolve: 'Usuário desativado com sucesso!',
        };
    }

    async fetchAllUsers(): Promise<HttpResponse<unknown>> {
        const base = `/api/users`;
        const response = await this.client.get({ url: base });
        return response;
    }

    async fetchAllReviewsMyReviews(): Promise<HttpResponse<any>> {
        const base = `/api/review/mine`;
        const response = await this.client.get({ url: base });
        if (response.statusCode !== 200) {
            return {
                ...response,
                reject: 'Erro ao buscar avaliações. Tente novamente mais tarde.',
            }
        }
        return response;
    }

    async fetchBooksQuantity(): Promise<HttpResponse<any>> {
        const base = '/api/pages/mine';
        const response = await this.client.get({ url: base });
        return response;
    }

    async promoteUser(id: UserData['id']): Promise<HttpResponse<unknown>> {
        const base = `/api/admin/change-role/${id}`;
        const response = await this.client.post({ url: base });
        if (response.statusCode !== 200) {
            return {
                ...response,
                reject: 'Erro ao promover usuário. Tente novamente mais tarde.',
            }
        } else {
            return {
                ...response,
                resolve: "Usuário promovido para ADMIN com sucesso!",
            }
        }

    }
}