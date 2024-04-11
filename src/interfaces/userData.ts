import { BookProgressionData } from "./bookProgressionData";
import { ReviewData } from "./reviewData";

export interface userData {
    id: string,
    name: string,
    username: string,
    password: string,
    image: boolean,
    enabled: boolean,
    role: string,
    progressions: Array<BookProgressionData>,
    reviews: Array<ReviewData>,
}