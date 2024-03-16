import { userLoginData } from './../interfaces/userLoginData';
import axios, { AxiosPromise } from "axios"
import { userData } from "../interfaces/userData"
import { useQuery } from "@tanstack/react-query"

const API_URL = 'http://172.16.40.144:8080'
const LOGIN_PARAM = '/auth/login'
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnLmNvbSIsImlhdCI6MTcxMDM3NDcyMiwiZXhwIjoxNzEwNDYxMTIyfQ.LSdrxEVN53esYpxQ6dQLSG0pyEFWfEQSylH36WQH5G0'


export async function loginUser(UserLoginData: userLoginData): Promise<string>{
    const loginUrl = API_URL + LOGIN_PARAM;
    try {
        console.log(loginUrl);
        const response = await axios.post(loginUrl, UserLoginData);
        return response.data.token;
    } catch (error) {
        throw (error);
    }
}

const fetchUserData = async () : AxiosPromise<userData[]> => {
    const response = axios({
        method: 'get',
        url: API_URL + '/api/users/me',
        headers: {
            Authorization: `Bearer ${token}`
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