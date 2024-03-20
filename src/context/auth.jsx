import axios from "axios";
import React, {createContext, useEffect, useState} from "react";

const API_URL = 'http://localhost:8080';
const LOGIN_PARAM = '/auth/login';

axios.defaults.baseURL = API_URL;
export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadingStoreData = async () => {
            const storageUser = localStorage.getItem('@Auth:user');
            const storageToken = localStorage.getItem('@Auth:token');

            console.log("storage token: " + storageToken);
            console.log("storage user: " +storageUser);

            if (storageUser && storageToken) {
                setUser(storageUser);
                // axios.AxiosHeaders = {Authorization: `Bearer ${storageToken}`}
            }
        };

        loadingStoreData();
    }, [user]);

    const getUser = async (token) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(API_URL + '/api/users/me' ,{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        console.log('response do get user: ' + response);
        return response.data;

    }

    const signIn = async (userLoginData) => {
        const response = await axios.post(API_URL + LOGIN_PARAM, userLoginData);

        const token = response.data.token;
        const expiresInMilliseconds = response.data.expiresIn;
        const expirationDate = new Date(new Date().getTime() + expiresInMilliseconds);

        localStorage.setItem('@Auth:token', token);
        localStorage.setItem('@Auth:expirationDate', expirationDate.toISOString());

        setTimeout(logout, expiresInMilliseconds);

        if (response.data.error) {
            alert(response.data.error);
        }else{
            const response = await getUser(token);
            console.log('response do get user: ' + response);
            setUser(response);

            const user = response.data.user;
            console.log('user antes de setar: ' + user);
            localStorage.setItem('@Auth:user', user);

            return { token, user, expirationDate };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('@Auth:token');
        localStorage.removeItem('@Auth:user');
        localStorage.removeItem('@Auth:expirationDate');
    };

    return (
        <AuthContext.Provider value={{
            user,
            signEd : !!user,
            signIn
        }}>
            { children }
        </AuthContext.Provider>
    );
};