import axios, { AxiosPromise } from "axios";
import { userData } from "../interfaces/userData";
import { useQuery } from "@tanstack/react-query";
import { userRegisterData } from "../interfaces/userRegisterData";
import { config } from "./config";

const API_URL = config.apiUrl;

export async function registerUser(
  UserRegisterData: userRegisterData
): Promise<string> {
  const response = await axios.post(API_URL + "/auth/signup", UserRegisterData);
  return response.data;
}

const fetchUserData = async (): AxiosPromise<userData[]> => {
  const response = axios({
    method: "get",
    url: API_URL + "/api/users/me",
    headers: {},
  });
  return response;
};

export function useUserData() {
  const query = useQuery({
    queryFn: fetchUserData,
    queryKey: ["userData"],
    retry: 2,
  });
  return {
    ...query,
    userData: query.data?.data,
  };
}
