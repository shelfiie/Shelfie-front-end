import { useEffect } from "react"
import { BookData } from "../../types/bookData"
import { BookService } from "../services/BookService";

const useFetchMyBooks = ({ bookStatus }: BookData) => {
    const service = new BookService();
    
    useEffect(() => {
        const fetchMyBooksByStatus = async () => {
            const response = await service.fetchBooksByStatus( bookStatus as string );
            console.log(response)
        }

        fetchMyBooksByStatus();
    })
}

export { useFetchMyBooks };