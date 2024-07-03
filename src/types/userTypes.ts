import { z } from "zod";
import { BookProgressionData } from "./bookProgressionData";
import { ReviewData } from "./reviewData";

export type userData = {
    id: string,
    name: string,
    userName: string,
    email: string,
    password: string,
    token?: string,
    image?: boolean,
    enabled: boolean,
    role: string,
    progressions?: Array<BookProgressionData>,
    reviews?: Array<ReviewData>,
}

export const userLoginFilter = z.object({
    email: z.string().email({ message: 'Email inválido' }).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'Email inválido' }),
    password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});

export type UserLoginFilter = z.infer<typeof userLoginFilter>;