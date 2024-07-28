import { useEffect, useState } from "react"
import { BookService } from "../services/BookService"
import { StatusCode } from "../client/IHttpClient";
import { BookData } from "../../types/bookData";

const useFetchAllProgressions = () => {
    const [progressions, setProgressions] = useState<BookData['progressions']>();
    const service = new BookService();

    useEffect(() => {
        const fetchAllProgressions = async () => {
            // pega todas as progressions
            const progressions = await service.fetchProgressions();
            // se tiver progressions
            if (progressions.statusCode === StatusCode.Ok) {
                // mapeia todas as progressões pra buscar os detalhes do livro
                progressions.body.map(async (progression: BookData['progressions']) => {
                    if (progression) {
                        // busca os detalhes do livro
                        const bookDetails = await service.fetchBooksByGoogleId(progression.googleId as string);
                        const myBook = await service.fetchBooksByBookId(progression.bookId);
                        
                        // se tiver detalhes do livro
                        if (bookDetails.statusCode === StatusCode.Ok) {
                            const bookDataNeeded = {
                                googleId: bookDetails.body.googleId,
                                thumbnailUrl: bookDetails.body.thumbnailUrl,
                                smallThumbnailUrl: bookDetails.body.smallThumbnailUrl,
                                title: bookDetails.body.title,
                                status: myBook.body[0].bookStatus,
                                commentary: progression.commentary,
                                page: progression.page,
                                createdAt: progression.createdAt
                            }
                            setProgressions(bookDataNeeded as BookData['progressions']);
                        } else {
                            return {
                                ...progressions,
                                reject: 'Erro ao buscar progressões'
                            }
                        }
                    }
                })
            } else {
                return progressions
            }
        }
        fetchAllProgressions();
    }, [])
    return { progressions } 
}

export { useFetchAllProgressions }