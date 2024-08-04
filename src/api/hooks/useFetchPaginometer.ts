import { useEffect, useState } from "react";
import { UserService } from "../services/UserService"
import { BookData } from "../../types/bookData";

const useFetchPaginometer = () => {
    const [quantity, setQuantity] = useState<BookData['quantity']>({ abandonado: 0, favorite: 0, lendo: 0, lido: 0, queroLer: 0, review: 0, paginometer: 0 });

    const userService = new UserService();

    useEffect(() => {
        const fetchPaginometro = async () => {
            const response = await userService.fetchBooksQuantity();
            setQuantity((prevState: BookData['quantity']) => ({
                ...prevState,
                paginometer: response.body?.paginometer,
                review: response.body?.review,
                favorite: response.body?.favorite,
                lido: response.body?.lido,
                lendo: response.body?.lendo,
                queroLer: response.body?.quero_LER,
                abandonado: response.body?.abandonado,
            }))
        };

        fetchPaginometro();
    }, []);

    return { quantity }
}

export { useFetchPaginometer }