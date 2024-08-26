import { useEffect, useState } from "react";
import { UserData } from "../../types/userType";
import { UserService } from "../services/UserService";
import { StatusCode } from "../client/IHttpClient";

const useFetchAllUsers = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const userService = new UserService();

    const fetchUsers = async () => {
        const response = await userService.fetchAllUsers();
        if (response.statusCode === StatusCode.Ok) {
            setUsers(response?.body as UserData[]);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, refetchUsers: fetchUsers };
}

export { useFetchAllUsers };