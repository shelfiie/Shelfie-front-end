import { Logo } from "../../assets/logos/shelfie-logo.svg.tsx";
import { ErrorText, Globals } from "../../styles/globals.ts";
import { Theme } from "../../styles/theme.ts";
import { Form, ItemsForm } from "../login/login-styles.ts";
import { MyBookLogo } from "../../assets/logos/mybook-logo.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { userRegisterFilter, UserRegisterFilter } from '../../types/authType.ts'
import { zodResolver } from '@hookform/resolvers/zod';
import { Botao } from "../../components/globals/Button.style.tsx";
import { useNavigate } from "react-router-dom";
import { RegisterDiv, TemContaP } from "./registro-styles.ts";
import { useContext, useState } from "react";
import { AuthContext } from "../../api/context/auth.tsx";
import { StatusCode } from "../../api/client/IHttpClient.ts";
import { Alert, Snackbar } from "@mui/material";
import { InputStyle } from "../../components/globals/Input.style.tsx";

export function Registro() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [success, setSuccess] = useState<string | undefined>('');
    const [error, setError] = useState<string | undefined>('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<UserRegisterFilter>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(userRegisterFilter),
    });

    const onSubmit: SubmitHandler<UserRegisterFilter> = async () => {
        const data = {
            name: watch('name'),
            email: watch('email'),
            nickname: watch('nickname'),
            password: watch('password'),
        }

        const response = await auth.register(data);
        if (response?.statusCode === StatusCode.Created) {
            setSuccess(response.resolve);
            setTimeout(() => navigate('/'), 3000);
        } else {
            setError(response?.reject);
            setTimeout(() => setError(''), 4000);
        }
    }

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <>
            <RegisterDiv backgroundcolor={Theme.colors.light}>
                <div>
                    <MyBookLogo />
                    <Logo />
                    <p>Registre-se para continuar para sua biblioteca digital</p>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <ItemsForm>
                        <label htmlFor="nome">Nome Completo</label>
                        <InputStyle
                            id="name"
                            {...register('name')}
                            type="text"
                            placeholder="Digite seu nome completo"
                        />
                        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                    </ItemsForm>

                    <ItemsForm>
                        <label htmlFor="email">E-mail</label>
                        <InputStyle
                            id="email"
                            {...register('email')}
                            type="email"
                            placeholder="Digite seu e-mail" />
                        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                    </ItemsForm>

                    <ItemsForm>
                        <label htmlFor="usuario">Usuário</label>
                        <InputStyle
                            id="user"
                            {...register('nickname')}
                            type="text"
                            placeholder="Digite o nome de usuário" />
                        {errors.nickname && <ErrorText>{errors.nickname.message}</ErrorText>}
                    </ItemsForm>

                    <ItemsForm>
                        <label htmlFor="senha">Senha</label>
                        <InputStyle
                            id="password"
                            {...register('password')}
                            type="password"
                            placeholder="Digite sua senha" />
                        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                    </ItemsForm>

                    <ItemsForm>
                        <label htmlFor="confirmarSenha">Confirmar Senha</label>
                        <InputStyle
                            id="confirmPassword"
                            {...register('confirmPassword')}
                            type="password"
                            placeholder="Confirme sua senha" />
                        {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
                    </ItemsForm>

                    <Botao
                        disabled={hasErrors}
                        isError={hasErrors}
                        type="submit"
                        backgroundColor={Theme.colors.pink}
                        color={Theme.colors.light}
                    >
                        Registrar
                    </Botao>
                </Form>
                <TemContaP>
                    Ao se registrar, você concorda com os
                    <a target="_blank" href="https://drive.google.com/file/d/1b5VAG6pIslYbR3iVGZjrDuYPI1-qxwMB/view?usp=sharing">
                        Termos de Uso
                    </a> e as
                    <a  target="_blank" href="https://drive.google.com/file/d/1TyEnKEeuzuygyn4yq3RwCHZ55gLtndoW/view?usp=sharing">
                        Política de Privacidade
                    </a> do sistema.
                </TemContaP>
                <TemContaP>
                    Já tem uma conta?
                    <a onClick={() => navigate('/')}>
                        Entre aqui
                    </a>
                </TemContaP>
            </RegisterDiv>
            {success &&
                <Snackbar anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} open={true} autoHideDuration={4000}>
                    <Alert variant="filled" severity="success">{success}</Alert>
                </Snackbar>
            }
            {error &&
                <Snackbar anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} open={true} autoHideDuration={4000}>
                    <Alert variant="filled" severity="error">{error}</Alert>
                </Snackbar>
            }
            <Globals />
        </>
    );
}