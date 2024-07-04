import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { fetchUserData } from "../api/useUserData";
import { AuthService } from "../api/services/AuthService";
import { userData } from "../types/userTypes";
import { set } from "zod";


export const AuthContext = createContext<{
  user: null | any;
  signed: boolean;
  signIn: (body: userData) => Promise<void>;
  logout: () => void;
  token: string;
} | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useContext(AuthContext);
    const authService = new AuthService();
    // const [signed, setSigned] = useState(!!localStorage.getItem('@Auth:userId'));
    const [user, setUser] = useState(null);
    const [signed, setSigned] = useState(!!user);
    const [expirationDate, setExpirationDate] = useState('');

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

    const signIn = async (body: userData) => {
        if (body.email && body.password) {
            const response = await authService.loginUser(body);

            localStorage.setItem('@Auth:token', response.body.token);
            
            const expiresInMilliseconds = response.body.expiresIn;
            setTimeout(logout, expiresInMilliseconds);
            const expirationDate = new Date(new Date().getTime() + expiresInMilliseconds);
            setExpirationDate(expirationDate.toISOString());

            console.log(response)
        }

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
            logout,
            token
        }}>
            {children}
        </AuthContext.Provider>
    );
};