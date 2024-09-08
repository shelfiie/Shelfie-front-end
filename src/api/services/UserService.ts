import { UserData } from "../../types/userType";
import { HttpResponse, StatusCode } from "../client/IHttpClient";
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

    async fetchUserById(id: UserData['id']): Promise<HttpResponse<unknown>> {
        const base = `/api/users/${id}`;
        const response = await this.client.get({ url: base });
        if (response.statusCode !== 200) {
            return {
                ...response,
                reject: 'Erro ao buscar usuário. Tente novamente mais tarde.',
            }
        } else {
            return {
                ...response,
                resolve: "Usuário encontrado com sucesso!",
            }
        }
    }

    async editUser(data: UserData): Promise<HttpResponse<unknown>> {
        const base = `/api/users/${data.id}/update`;
        const response = await this.client.put({ url: base, body: data });
        if (response.statusCode !== 200) {
            return {
                ...response,
                reject: 'Erro ao atualizar usuário. Tente novamente mais tarde.',
            }
        } else {
            return response;
        }
    }

    async editProfileImage(image: UserData['image']): Promise<HttpResponse<unknown>> {
        const base = `/api/users/upload-image`;
        const response = await this.client.put({ url: base, body: { image } });
        if (response.statusCode !== 200) {
            return {
                ...response,
                reject: 'Erro ao atualizar imagem. Tente novamente mais tarde.',
            }
        } else return {
            ...response,
            resolve: 'Imagem atualizada com sucesso!',
        };
    }

    async disableUserAdmin(id: UserData['id']): Promise<HttpResponse<unknown>> {
        const base = `/api/users/admin/${id}/disable`;
        const response = await this.client.put({ url: base });
        if (response.statusCode !== 200) {
            return {
                ...response,
                reject: 'Erro ao desativar usuário. Tente novamente mais tarde.',
            }
        } else {
            return {
                ...response,
                resolve: 'Usuário desativado com sucesso!',
            }
        }
    }

    async disableMe(): Promise<HttpResponse<unknown>> {
        const base = `/api/users/disable`;
        const response = await this.client.put({ url: base });
        if (response.statusCode !== 200) {
            return {
                ...response,
                reject: 'Erro ao desativar usuário. Tente novamente mais tarde.',
            }
        } else {
            return {
                ...response,
                resolve: 'Usuário desativado com sucesso!',
            }
        }
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
        const response = await this.client.put({ url: base });
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
    async fetchMyLikedReviews(): Promise<HttpResponse<any>> {
        const base = '/api/like/mine';
        const response = await this.client.get({ url: base });

        if (response.statusCode === StatusCode.Ok) return response;
        return {
            ...response,
            reject: 'Erro ao buscar reviews curtidos.',
        }
    }

    async fetchMyBadges(): Promise<HttpResponse<any>> {
        const base = '/api/badges/user';
        const response = await this.client.get({ url: base });
        if (response.statusCode === StatusCode.Ok) return response;
        return {
            ...response,
            reject: 'Erro ao buscar conquistas.',
        }
    }
}