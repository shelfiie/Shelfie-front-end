// import { useCallback, useEffect, useState } from "react";
// import { BookData } from "../../types/bookData";
// import { StatusCode } from "../client/IHttpClient";
// import { UserService } from "../services/UserService";
// import { BookService } from "../services/BookService";

// const useFetchLikedReview = () => {
//     const [loading, setLoading] = useState<boolean>(false);
//     const [likedReviews, setLikedReviews] = useState<BookData['reviews'][]>();

//     const userService = new UserService();
//     const bookService = new BookService();

//     const fetchLikedReviews = useCallback(async () => {
//         setLoading(true);
//         const response = await userService.fetchMyLikedReviews();
//         if (response.statusCode === StatusCode.Ok) {
//             const likedReviews = response.body;

//             const combinedReviews = await Promise.all(likedReviews.map(async (likedReview: any) => {
//                 if (likedReview) {
//                     const reviewsDetails = await userService.fetchAllReviewsMyReviews();

//                     if (review) {
//                         const booksDetailsResponse = await bookService.fetchBookById(review.bookId);
//                         if (booksDetailsResponse.statusCode === StatusCode.Ok) {
//                             const data = {
//                                 ...review,
//                                 googleId: booksDetailsResponse.body.googleId,
//                                 title: booksDetailsResponse.body.title,
//                                 smallThumbnailUrl: booksDetailsResponse.body.smallThumbnailUrl,
//                                 thumbnailUrl: booksDetailsResponse.body.thumbnailUrl,
//                             };
//                             return { ...review, ...data };
//                         } else {
//                             return {
//                                 ...review,
//                                 reject: 'Ocorreu um erro no caminho.'
//                             };
//                         }
//                     }
//                 }
//                 return likedReview;
//             }));
//             combinedReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//             setLikedReviews(combinedReviews);
//             setLoading(false);
//             return combinedReviews;
//         }
//     }, []);

//     useEffect(() => {
//         fetchLikedReviews();
//     }, []);

//     return { retchLikedReviews: fetchLikedReviews, likedReviews, loading };
// }
// export { useFetchLikedReview };