// import { useEffect, useState } from "react";
// import { BookData } from "../../types/bookData";
// import { BookService } from "../services/BookService";

// const usePostBookStatus = ({ googleId, status }: BookData) => {
//     const [bookStatus, setBookStatus] = useState<string | null>(null);
//     const [options, setOptions] = useState<string[]>([]);
//     const [bookId, setBookId] = useState<string>('');
//     const [loading, setLoading] = useState<boolean>(false);

//     const bookService = new BookService();

//     useEffect(() => {
//         const updateBookStatus = async () => {
//             setLoading(true);
//             try {
//                 const response = await bookService.getBookStatus({ googleId });
//                 if( response.statusCode === 200) {
//                     const putResponse = await bookService.putBookStatus({ id: bookId, status });
//                 }
//             } catch (error) {

//             }

//             setLoading(false);
//         }


//         updateBookStatus();
//     }, [googleId]);

//     return { bookStatus, options, bookId, loading };
// }
// const bookOptions = ['Quero ler', 'Lendo', 'Lido', 'Abandonado'];

// export { usePostBookStatus, bookOptions };

const bookOptions = ['Quero ler', 'Lendo', 'Lido', 'Abandonado'];

export { bookOptions }