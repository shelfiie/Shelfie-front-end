import axios, { AxiosPromise } from "axios";
import { userData } from "../interfaces/userData";
import { userRegisterData } from "../interfaces/userRegisterData";
import { config } from "./config";

const API_URL = config.apiUrl;

export async function registerUser(
  UserRegisterData: userRegisterData
): Promise<string> {
  const response = await axios.post(API_URL + "/auth/signup", UserRegisterData);
  return response.data;
}

export const fetchUserData = async (token: string): AxiosPromise<userData[]> => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axios.get(API_URL + '/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return response.data;
};
