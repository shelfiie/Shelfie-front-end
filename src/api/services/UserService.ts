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
        console.log(response);
        return response;
    }

    async updateUserData(data: UserData): Promise<HttpResponse<unknown>> {
        const base = `/api/users/me`;
        const response = await this.client.put({ url: base, body: data });
        return response;
    }

    async disableUser(id : UserData): Promise<HttpResponse<unknown>> {
        const base = `/api/users/${id}`;
        const response = await this.client.put({ url: base });
        return response;
    }

    async fetchAllUsers(): Promise<HttpResponse<unknown>> {
        const base = `/api/users`;
        const response = await this.client.get({ url: base });
        return response;
    }

}