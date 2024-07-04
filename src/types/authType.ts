import { z } from "zod";

export const userLoginFilter = z.object({
    email: z.string().email({ message: 'Email inválido' }).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'Email inválido' }),
    password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});

export type UserLoginFilter = z.infer<typeof userLoginFilter>;

export const userRegisterFilter = z.object({
    name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    usernome: z.string().min(3, { message: 'Nome de usuário deve ter no mínimo 3 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'Email inválido' }),
    password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    confirmPassword: z.string(),
})
.refine(data => data.password === data.confirmPassword,
    {
        message: 'Senhas não conferem',
        path: ['confirmPassword']
    });

export type UserRegisterFilter = z.infer<typeof userRegisterFilter>;
