import { MyBookLogo } from "../../assets/logos/mybook-logo.tsx";
import { Logo } from "../../assets/logos/shelfie-logo.svg.tsx";
import { Input } from "../../components/globals/Input.style.ts";
import { ErrorText, Globals } from "../../styles/globals.ts";
import { Theme } from "../../styles/theme.ts";
import { Form, ItemsForm, LoginDiv } from "./login-styles.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginFilter, userLoginFilter } from "../../types/authType.ts";
import { useContext, useState } from "react";
import { AuthContext } from "../../api/context/auth.tsx";
import { Alert } from "@mui/material";
import { Botao } from "../../components/globals/Button.style.tsx";
import { Navigate, useNavigate } from "react-router-dom";
import { TemContaP } from "../registro/registro-styles.ts";
import { UserData } from "../../types/userType.ts";

export function Login() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, signed } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<UserLoginFilter>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(userLoginFilter)
    });

    const onSubmit: SubmitHandler<UserLoginFilter> = async () => {
        setLoading(true);

        const data = {
            email: watch('email'),
            password: watch('password')
        }

        const response = await login(data as UserData);

        if (response?.statusCode != 200) {
            setLoading(false);
            setError(response?.reject);
        } else {
            setLoading(false);
        }

        setTimeout(() => setError(''), 5000);

    };

    const hasErrors = Object.keys(errors).length > 0;

    if (signed) return <Navigate to="/home" />
    return (
        <>
            <LoginDiv backgroundcolor={Theme.colors.light}>

                <ItemsForm>
                    <div>
                        <MyBookLogo />
                        <Logo />
                    </div>
                    <p>Entre para continuar para sua biblioteca digital</p>
                </ItemsForm>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ItemsForm>
                        <label htmlFor="email">Email</label>
                        <Input required
                            id="email"
                            type="email"
                            placeholder="Digite seu e-mail"
                            {...register('email')}
                        />
                        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                    </ItemsForm>

                    <ItemsForm>
                        <label htmlFor="password">Senha</label>
                        <Input required
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            {...register('password')}
                        />
                        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                    </ItemsForm>

                    {error &&
                        <Alert sx={{ padding: '0 .275rem', borderRadius: '1.5rem' }} variant="outlined" severity="error">
                            {error}
                        </Alert>}

                    {/* <CheckBox>
                        <div>
                            <input type="checkbox" placeholder="Lembre de mim" id="rememberMe" />
                            <span>Lembre de mim</span>
                        </div>
                        <a href="#"><u>Esqueceu a senha?</u></a>
                    </CheckBox> */}

                    <Botao
                        isError={hasErrors}
                        disabled={loading}
                        backgroundColor={`${Theme.colors.pink}`}
                        color={Theme.colors.light}
                    >
                        {loading ? 'Carregando...' : 'Entrar'}
                    </Botao>

                    <TemContaP> Novo usuário?
                        <a onClick={() => navigate('/registro')}>
                            Registre-se aqui!
                        </a>
                    </TemContaP>
                </Form>
            </LoginDiv>
            <Globals />
        </>
    )

}
