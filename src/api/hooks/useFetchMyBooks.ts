import { useEffect } from "react"
import { BookData } from "../../types/bookData"
import { BookService } from "../services/BookService";

const useFetchMyBooks = ({ status }: BookData) => {
    const service = new BookService();
    
    useEffect(() => {
        const fetchMyBooksByStatus = async () => {
            const response = await service.fetchBookByStatus( status );
            console.log(response)
        }

        fetchMyBooksByStatus();
    })
}

export { useFetchMyBooks };