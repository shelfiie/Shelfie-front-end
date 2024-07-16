import { BookProgressionData } from "./bookProgressionData";
import { ReviewData } from "./reviewData";

export enum UserRole {
    ADMIN = 'ROLE_ADMIN',
    USER = 'ROLE_USER',
}

export type UserData = {
    map: any;
    id?: string,
    name?: string,
    userName?: string,
    nickname?: string,
    email?: string,
    password: string,
    token?: string,
    image?: string,
    enabled?: boolean,
    role?: UserRole,
    progressions?: Array<BookProgressionData>,
    reviews?: Array<ReviewData>,
}