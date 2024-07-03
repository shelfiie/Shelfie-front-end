import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { fetchUserData } from "../api/useUserData";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [signed, setSigned] = useState(!!localStorage.getItem('@Auth:userId'));

    // useEffect(() => {
    //     const loadingStoreData = async () => {
    //         const storageUserId = localStorage.getItem('@Auth:userId');
    //         const storageToken = localStorage.getItem('@Auth:token');
    //         if (storageUserId && storageToken) {
    //             axios.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
    //             setSigned(true);
    //         } else {
    //             setSigned(false);
    //         }
    //     };
    //     loadingStoreData();
    // }, [signed]);

    const signIn = async ({  }) => {
        const response = await axios.post(API_URL + '/auth/login', userLoginData);

        const token = response.data.token;
        const expiresInMilliseconds = response.data.expiresIn;
        const expirationDate = new Date(new Date().getTime() + expiresInMilliseconds);

        setTimeout(logout, expiresInMilliseconds);

        localStorage.setItem('@Auth:token', token);
        localStorage.setItem('@Auth:expirationDate', expirationDate.toISOString());
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


        const userData = await fetchUserData(token)
            .then(response => { return response })
            .catch(error => {
                localStorage.removeItem('@Auth:token');
                localStorage.removeItem('@Auth:expirationDate');
                return error;
            });
        localStorage.setItem('@Auth:userId', userData.id);
        localStorage.setItem('@Auth:userName', userData.usernome);

        setSigned(true);
        return;

    };

    const logout = () => {
        localStorage.removeItem('@Auth:token');
        localStorage.removeItem('@Auth:userId');
        localStorage.removeItem('@Auth:expirationDate');
        localStorage.removeItem('@Auth:userName');

        setSigned(false);
    };

    return (
        <AuthContext.Provider value={{
            user,
            signed,
            signIn,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};