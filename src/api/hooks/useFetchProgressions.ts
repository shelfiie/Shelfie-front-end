import { useEffect, useState } from "react"
import { BookService } from "../services/BookService"
import { StatusCode } from "../client/IHttpClient";
import { BookData } from "../../types/bookData";

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
                        const bookDetails = await service.fetchBooksByGoogleId(progression?.googleId as string);
                        const myBook = await service.fetchMyBooksByGoogleId(progression?.googleId);

                        const lastPage = await service.fetchLastPage(myBook.body.bookId);

                        if (bookDetails.statusCode === StatusCode.Ok && myBook.statusCode === StatusCode.Ok) {
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
                                description: bookDetails.body.description,
                                percentage: lastPage.body.porcentage
                            };
                        } else {
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
