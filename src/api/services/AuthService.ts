/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from "../client/IHttpClient";
import { ShelfieHttpClient } from "../client/ShelfieHttpClient";
import { UserData } from "../../types/userType";

export class AuthService {
    private client: ShelfieHttpClient;

    constructor() {
        this.client = new ShelfieHttpClient();
    }

    async loginUser({ email, password }: UserData): Promise<HttpResponse<any>> {
        const base = '/auth/login';
        const response = await this.client.post({ url: base, body: { email, password } });

        if (response.statusCode === 200) {
            return response;
        } else {
            return response;
        }
    }

    async registerUser({ name, email, password, nickname }: UserData): Promise<HttpResponse<any>> {
        const base = '/auth/signup';
        try {
            const response = await this.client.post({ url: base, body: { name, email, password, nickname } });

            if (response.statusCode === 200) {
                return {
                    statusCode: 200,
                    body: response.body,
                    resolve: 'Usuário cadastrado com sucesso',
                }

            } else {
                return response;
            }
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário');
        }
    }

}