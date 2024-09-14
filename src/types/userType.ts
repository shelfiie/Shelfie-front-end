import { BookProgressionData } from "./bookProgressionData";
import { ReviewData } from "./reviewData";

export enum UserRole {
    ADMIN = 'ROLE_ADMIN',
    USER = 'ROLE_USER',
}

export type Badge = {
    imageBookBadge: string | undefined,
    descriptionBookBadge: string | undefined,
    nameBookBadge: string | undefined,
    imagePaginometerBadge: string | undefined,
    descriptionPaginometerBadge: string | undefined,
    namePaginometerBadge: string | undefined,
    imageReviewBadge: string | undefined,
    descriptionReviewBadge: string | undefined,
    nameReviewBadge: string | undefined,
}

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
    role?: UserRole,
    progressions?: Array<BookProgressionData>,
    reviews?: Array<ReviewData>,
    badges?: Array<Badge>,
}

export const profileImageLinks = [
    "https://i.imgur.com/r188QHj.png",
    "https://i.imgur.com/D6c6tcT.png",
    "https://i.imgur.com/FTj8i7I.png",
    "https://i.imgur.com/CMjlLFo.png",
    "https://i.imgur.com/gKrDQnh.png",
    "https://i.imgur.com/lybjxgO.png",
    "https://i.imgur.com/uF12bMa.png",
    "https://i.imgur.com/hGsZgTx.png",
    "https://i.imgur.com/uDx65Mc.png",
    "https://i.imgur.com/eKU0rYf.png"
]