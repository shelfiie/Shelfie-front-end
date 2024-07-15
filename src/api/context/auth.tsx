import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";
import { UserData } from "../../types/userType";
import { HttpResponse, StatusCode } from "../client/IHttpClient";
import { resolve } from "path";


type AuthContextProps = {
    signed: boolean;
    token: string;
    login: (body: UserData) => Promise<HttpResponse<unknown> | undefined>;
    register: (body: UserData) => Promise<HttpResponse<unknown> | undefined>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const authService = new AuthService();
    const [signed, setSigned] = useState(!!localStorage.getItem('@Auth:token'));
    const [token, setToken] = useState('');

    useEffect(() => {
        const loadingStoreData = () => {
            checkAuth();
            const storageToken = localStorage.getItem('@Auth:token');
            if (storageToken) {
                setSigned(true);
            } else {
                setSigned(false);
            }
        };
        loadingStoreData();
    }, [signed]);

    async function login({ email, password }: UserData) {
        const response = await authService.loginUser({ email, password });
        
        if (response.statusCode === StatusCode.Ok) {
            localStorage.setItem('@Auth:token', response.body.token);
            setToken(response.body.token);

            const expiresInMilliseconds = response.body.expiresIn;
            console.log(response);
            setTimeout(logout, expiresInMilliseconds);

            const expirationDate = new Date(new Date().getTime() + expiresInMilliseconds);
            localStorage.setItem('@Auth:expirationDate', expirationDate.toISOString());

            setSigned(true);

            return response;
        } else {
            return response;
        }
    }

    async function checkAuth() {
        const token = localStorage.getItem('@Auth:token');
        if (!token) {
            return;
        }

        const expirationDate = localStorage.getItem('@Auth:expirationDate');
        const expiresIn = new Date(expirationDate || '');

        if (expiresIn <= new Date()) {
            logout();
            return;
        }

        setToken(token);
        setSigned(true);
    }

    async function register({ name, email, nickname, password }: UserData) : Promise<HttpResponse<unknown> | undefined>{
        const response = await authService.registerUser({ name, email, nickname, password });

        if (response.body) {
            return {
                ...response,
                resolve: 'Usuário cadastrado com sucesso'
            };
        } else {
            return response;
        }
    }

    const logout = () => {
        localStorage.removeItem('@Auth:token');
        localStorage.removeItem('@Auth:expirationDate');
        setSigned(false);
    };

    return (
        <AuthContext.Provider value={{
            register,
            signed,
            login,
            logout,
            token
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }