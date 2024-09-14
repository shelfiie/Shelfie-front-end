import { useEffect, useState } from "react";
import { BookData } from "../../types/bookData";
import { BookService } from "../services/BookService";

const useFetchAllReports = () => {
    const [reports, setReports] = useState<BookData['report'][]>([]);
    const service = new BookService();

    const fetchAllReports = async () => {
        const response = await service.fetchAllReports();
        if (response.statusCode === 200) {
            const reportsBody = response.body;
            setReports(reportsBody);
        } else return response.reject;
    }

    useEffect(() => {
        fetchAllReports();
    }, []);

    return { reports, refetchReports: fetchAllReports };
}

export { useFetchAllReports };