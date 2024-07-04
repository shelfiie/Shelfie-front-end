import { ReactNode, createContext, useState } from "react";
import { fetchUserData } from "../hooks/useUserData";
import { AuthService } from "../api/services/AuthService";
import { userData } from "../types/userType";


export const AuthContext = createContext<{
    user: null | any;
    signed: boolean;
    logIn: (body: userData) => Promise<void>;
    logout: () => void;
    token: string;
} | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const authService = new AuthService();
    // const [signed, setSigned] = useState(!!localStorage.getItem('@Auth:userId'));
    const [user, setUser] = useState(null);
    const [signed, setSigned] = useState(!!user);
    const [expirationDate, setExpirationDate] = useState('');
    const [token, setToken] = useState('');

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

    const logIn = async ({ email, password }: userData) => {
        console.log(email, password);
        if (email && password) {
            const response = await authService.loginUser({ email, password });

            localStorage.setItem('@Auth:token', response.body.token);
            setToken(response.body.token);

            const expiresInMilliseconds = response.body.expiresIn;
            setTimeout(logout, expiresInMilliseconds);
            const expirationDate = new Date(new Date().getTime() + expiresInMilliseconds);
            setExpirationDate(expirationDate.toISOString());

        }

        // const userData = await fetchUserData()
        //     .then(response => { return response })
        //     .catch(error => {
        //         localStorage.removeItem('@Auth:token');
        //         localStorage.removeItem('@Auth:expirationDate');
        //         return error;
        //     });
        // localStorage.setItem('@Auth:userId', userData.id);
        // localStorage.setItem('@Auth:userName', userData.usernome);

        // setSigned(true);
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
            logIn,
            logout,
            token
        }}>
            {children}
        </AuthContext.Provider>
    );
};