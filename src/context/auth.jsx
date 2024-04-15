import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { config } from "../api/config";
import { fetchUserData } from "../api/useUserData";

const API_URL = config.apiUrl;

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    useEffect(() => {
        const loadingStoreData = async () => {
            const storageUserId = localStorage.getItem('@Auth:userId');
            const storageToken = localStorage.getItem('@Auth:token');
            if (storageUserId && storageToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
            }
        };
        loadingStoreData();
    }, [localStorage.getItem('@Auth:token'), localStorage.getItem('@Auth:userId')]);

    const signIn = async (userLoginData) => {
        try {
            const response = await axios.post(API_URL + '/auth/login', userLoginData);

            const token = response.data.token;
            const expiresInMilliseconds = response.data.expiresIn;
            const expirationDate = new Date(new Date().getTime() + expiresInMilliseconds);

            setTimeout(logout, expiresInMilliseconds);

            localStorage.setItem('@Auth:token', token);
            localStorage.setItem('@Auth:expirationDate', expirationDate.toISOString());

            const userData = await fetchUserData(token);
            localStorage.setItem('@Auth:userId', userData.id);
            localStorage.setItem('@Auth:userName', userData.username);

            return;

        } catch (error) {
            return error.response.data.description;
        }
    };

    const logout = () => {
        localStorage.removeItem('@Auth:token');
        localStorage.removeItem('@Auth:userId');
        localStorage.removeItem('@Auth:expirationDate');
        localStorage.removeItem('@Auth:userName');
    };

    return (
        <AuthContext.Provider value={{
            // significa que signEd será verdadeiro (true) se user não for nulo (null)
            signed: !!localStorage.getItem('@Auth:userId'),
            signIn,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};