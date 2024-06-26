import { z } from "zod";

export const userAuthSchema = z.object({
    signed: z.boolean(),
    user: z.object({
        id: z.string(),
        name: z.string(),
        userName: z.string(),
        email: z.string(),
        password: z.string(),
        token: z.string().optional(),
        image: z.boolean().optional(),
        enabled: z.boolean(),
        role: z.string(),
        progressions: z.array(z.object({
            id: z.string(),
            bookId: z.string(),
            progression: z.string(),
            userId: z.string(),
        })).optional(),
        reviews: z.array(z.object({
            id: z.string(),
            bookId: z.string(),
            review: z.string(),
            userId: z.string(),
        })).optional(),
    })
})