import axios from "axios";
import React, { createContext, useState } from "react";
import { userLoginData } from "../interfaces/userLoginData";
const API_URL = process.env.REACT_APP_API_URL!;
const LOGIN_PARAM = process.env.REACT_APP_LOGIN_PARAM!;


export const AuthContext = createContext(undefined);

export const AuthProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (UserLoginData: userLoginData) : Promise<string> => {
        try {
            const response = await axios.post(`${API_URL + LOGIN_PARAM}`, UserLoginData);
            if (response.data.error) {
                alert(response.data.error);
            }

            const token = response.data.token;
            const expiresInMilliseconds = response.data.expiresIn;
            const expirationDate = new Date(new Date().getTime() + expiresInMilliseconds);

            localStorage.setItem('@Auth:token', token);
            localStorage.setItem('expirationDate', expirationDate.toISOString());

            setIsAuthenticated(true);
            return token;
        } catch (error) {
            throw (error);
        }
    };

    // const logout = () => {
    //     // Implemente a lógica de logout aqui
    //     setIsAuthenticated(false);
    // };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login }}>
            {children}
        </AuthContext.Provider>
    );
};