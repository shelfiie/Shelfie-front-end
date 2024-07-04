import { BookProgressionData } from "./bookProgressionData";
import { ReviewData } from "./reviewData";

export type userData = {
    id?: string,
    name?: string,
    userName?: string,
    usernome?: string,
    email?: string,
    password: string,
    token?: string,
    image?: boolean,
    enabled?: boolean,
    role?: string,
    progressions?: Array<BookProgressionData>,
    reviews?: Array<ReviewData>,
}