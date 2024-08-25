import { useEffect, useState } from "react";
import { BookData } from "../../types/bookData";
import { BookService } from "../services/BookService";
import { UserService } from "../services/UserService";
import { UserData } from "../../types/userType";

const useFetchAllReports = () => {
    const [reports, setReports] = useState<BookData['report'][]>([]);
    const [users, setUsers] = useState<UserData[]>([] as UserData[]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const service = new BookService();
    const userService = new UserService();

    const fetchAllReports = async () => {
        const response = await service.fetchAllReports();
        if (response.statusCode === 200) {
            const reportsBody = response.body;
            reportsBody.forEach(async (report : BookData['report']) => {
                const user = await userService.fetchUserById(report?.userId);
                // console.log(user);   
               
            });
            
            setSuccess(response?.resolve);
            setReports(response.body);
            setTimeout(() => setSuccess(undefined), 3000);
        } else {
            setError(response?.reject);
            setTimeout(() => setError(undefined), 3000);
        }
    }

    useEffect(() => {
        fetchAllReports();
    }, []);

    return { reports, refetchReports: fetchAllReports, error, success };
}

export { useFetchAllReports };