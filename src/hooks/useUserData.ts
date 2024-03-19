import { userLoginData } from './../interfaces/userLoginData';
import axios, { AxiosPromise } from "axios"
import { userData } from "../interfaces/userData"
import { useQuery } from "@tanstack/react-query"

const API_URL = 'http://localhost:8080'
const LOGIN_PARAM = '/auth/login'


export async function loginUser(UserLoginData: userLoginData): Promise<string>{
    const loginUrl = API_URL + LOGIN_PARAM;
    try {
        const response = await axios.post(loginUrl, UserLoginData);

        const token = response.data.token;
        const expiresInMilliseconds = response.data.expiresIn;
        const expirationDate = new Date(new Date().getTime() + expiresInMilliseconds);

        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate.toISOString());
        return token;

    } catch (error) {
        throw (error);
    }
}

const fetchUserData = async () : AxiosPromise<userData[]> => {
    const response = axios({
        method: 'get',
        url: API_URL + '/api/users/me',
        headers: {
            // Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export function useUserData(){
    const query = useQuery({
        queryFn: fetchUserData,
        queryKey: ['userData'],
        retry: 2
    })
    return{
        ...query,
        userData: query.data?.data
    }
}