import { userData } from "../../types/userTypes";
import { HttpResponse, IHttpClient } from "../IHttpClient";
import { ShelfieHttpClient } from "../ShelfieHttpClient";

export class AuthService {
    private client: IHttpClient;

    constructor() {
        this.client = new ShelfieHttpClient();
    }

    async loginUser({ email, password }: userData): Promise<HttpResponse<any>> {
        const base = '/auth/login';
        try {
            const response = await this.client.post({ url: base, body: { email, password } });

            if (response.statusCode === 200) {
                return {
                    statusCode: 200,
                    body: response.body,
                    resolve: 'Usuário logado com sucesso',
                }

            } else {
                return response;
            }
        } catch (error) {
            throw new Error('Erro ao logar usuário');
        }
    }

    async registerUser({ name, email, password, usernome }: userData): Promise<HttpResponse<any>> {
        const base = '/auth/signup';
        try {
            const response = await this.client.post({ url: base, body: { name, email, password, usernome } });

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