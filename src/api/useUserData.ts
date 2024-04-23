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

export const fetchUserData = async (token : string): AxiosPromise<userData[]> => {
  const response = await axios.get(API_URL + '/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUser = async (user: userData): AxiosPromise<userData> => {
  const response = await axios.put(API_URL + `/api/users/${user.id}/update`, { user });

  return response.data;
}

export const deleteUser = async (userId: string): AxiosPromise<userData> => {
  const response = await axios.delete(API_URL + `/api/users/${userId}/delete`);

  return response.data;
}