import { useEffect, useState } from "react"
import { BookService } from "../services/BookService"
import { StatusCode } from "../client/IHttpClient";
import { BookData } from "../../types/bookData";
import { limitedDescription } from "../../utils/filterDescription";

const useFetchAllProgressions = () => {
    const [progressions, setProgressions] = useState<BookData['progressions'][]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const service = new BookService();

    useEffect(() => {
        const fetchAllProgressions = async () => {
            setLoading(true);
            const progressionsResponse = await service.fetchProgressions();

            if (progressionsResponse.statusCode === StatusCode.Ok) {
                const progressionsArray = await Promise.all(
                    progressionsResponse.body.map(async (progression: BookData['progressions']) => {
                        const bookDetails = await service.fetchBookById(progression?.bookId as string);
                        // console.log('bookdetails: ', bookDetails);
                        const myBook = await service.fetchMyBooksByGoogleId(progression?.googleId);
                        const lastPage = await service.fetchLastPage(myBook.body.bookId);

                        if (bookDetails.statusCode === StatusCode.Ok && myBook.statusCode === StatusCode.Ok) {
                            setLoading(false);
                            return {
                                id: progression?.id,
                                googleId: bookDetails.body.googleId,
                                thumbnailUrl: bookDetails.body.thumbnailUrl,
                                smallThumbnailUrl: bookDetails.body.smallThumbnailUrl,
                                title: bookDetails.body.title,
                                status: myBook.body.bookStatus,
                                commentary: progression?.commentary,
                                page: lastPage?.body.page,
                                pageCount: bookDetails.body.pages,
                                createdAt: progression?.createdAt,
                                description: bookDetails.body.description && limitedDescription(bookDetails.body.description),
                                percentage: lastPage.body.porcentage
                            };
                        } else {
                            setLoading(false);
                            return null;
                        }
                    })
                );

                setProgressions(progressionsArray.filter(Boolean) as BookData['progressions'][]);
                setLoading(false);
            }
        };

        fetchAllProgressions();
    }, []);

    return { progressions, loading };
}

export { useFetchAllProgressions }
