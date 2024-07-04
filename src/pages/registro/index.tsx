import styled from "styled-components";
import { Logo } from "../../assets/logos/shelfie-logo.svg.tsx";
import { Input } from "../../components/globals/input.style.ts";
import { Globals } from "../../styles/globals.ts";
import { Theme } from "../../styles/theme.ts";
import { Entrar, Form, LoginDiv } from "../login/index.styles.ts";
import { MyBookLogo } from "../../assets/logos/mybook-logo.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { userRegisterFilter, UserRegisterFilter } from '../../types/authType.ts'
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.tsx";

const RegisterDiv = styled(LoginDiv)`
    @media (max-width: ${Theme.screen.desktopS}) {
        margin-top: ${Theme.margins.margin5rem};
        * input {
            padding: ${Theme.margins.margin1rem};
        }
        > div{
            margin: ${Theme.margins.margin3rem} 0 ${Theme.margins.margin4rem} 0;
        }

        > P {
            color: ${Theme.colors.dark};            
        }
    }
`


export function Registro() {

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

    const onSubmit: SubmitHandler<UserRegisterFilter> = (errors) => {
        console.log(errors);
    }

    return (
        <>
            <RegisterDiv backgroundcolor={Theme.colors.light}>
                <div>
                    <MyBookLogo />
                    <Logo />
                    <p>Registre-se para continuar para sua biblioteca digital</p>
                </div>
                <Form onSubmit={() => handleSubmit(onSubmit)}>
                    <label htmlFor="nome">Nome Completo</label>
                    <Input
                        id="name"
                        {...register('name')}
                        type="text"
                        placeholder="Digite seu nome completo"
                    />
                    {errors.name && <span>{errors.name.message}</span>}

                    <label htmlFor="email">E-mail</label>
                    <Input
                        id="email"
                        {...register('email')}
                        type="email"
                        placeholder="Digite seu e-mail" />
                    {errors.email && <span>{errors.email.message}</span>}

                    <label htmlFor="usuario">Usuário</label>
                    <Input
                        id="user"
                        {...register('usernome')}
                        type="text"
                        placeholder="Digite o nome de usuário" />
                    {errors.usernome && <span>{errors.usernome.message}</span>}

                    <label htmlFor="senha">Senha</label>
                    <Input
                        id="password"
                        {...register('password')}
                        type="password"
                        placeholder="Digite sua senha" />
                    {errors.password && <span>{errors.password.message}</span>}

                    <Input
                        id="confirmPassword"
                        {...register('confirmPassword')}
                        type="password"
                        placeholder="Confirme sua senha" />
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

                    <Entrar
                        content="Registrar"
                        type="submit"
                        backgroundcolor={Theme.colors.pink}
                        color={Theme.colors.light}
                    />
                </Form>
                <p>Já tem uma conta? <a href="/"> <u> Entre aqui </u></a></p>
            </RegisterDiv>
            <Globals />
        </>
    );
}