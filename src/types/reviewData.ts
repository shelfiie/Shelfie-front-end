// to do
export interface ReviewData {
    id: string,
    bookId: string,
    userId: string,
    rating: number,
    review: string,
    date: Date,
    likes: number,
    dislikes: number,
    // comments: Array<CommentData>
}