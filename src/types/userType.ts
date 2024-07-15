import { BookProgressionData } from "./bookProgressionData";
import { ReviewData } from "./reviewData";

export type UserData = {
    id?: string,
    name?: string,
    userName?: string,
    nickname?: string,
    email?: string,
    password: string,
    token?: string,
    image?: string,
    enabled?: boolean,
    role?: string,
    progressions?: Array<BookProgressionData>,
    reviews?: Array<ReviewData>,
}