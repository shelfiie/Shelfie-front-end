import { useContext } from "react";
import { MyBookLogo } from "../../assets/logos/mybook-logo.tsx";
import { Logo } from "../../assets/logos/shelfie-logo.svg.tsx";
import { Input } from "../../components/globals/input.style.ts";
import { AuthContext } from "../../context/auth.tsx";
import { Globals } from "../../styles/globals.ts";
import { Theme } from "../../styles/theme.ts";
import { CheckBox, Entrar, Form, LoginDiv } from "./index.styles.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginFilter, userLoginFilter } from "../../types/authType.ts";


export function Login() {
    const { logIn } = useContext(AuthContext);

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

    const onSubmit: SubmitHandler<UserLoginFilter> = (errors) => {
        console.log(errors);
    };

    const handleCLick = async (e: Event) => {
        e.preventDefault();
        const response = await logIn({ email: watch('email'), password: watch('password') });
        console.log(response);
    }

    // if (signed) return <Navigate to="/home" />
    return (
        <>
            <LoginDiv backgroundcolor={Theme.colors.light}>

                <div>
                    <MyBookLogo />
                    <Logo />
                    <p>Entre para continuar para sua biblioteca digital</p>
                </div>
                <Form onSubmit={() => handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input required
                            id="email"
                            type="email"
                            placeholder="Digite seu e-mail"
                            {...register('email')}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="password">Senha</label>
                        <Input required
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            {...register('password')}
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>

                    <CheckBox>
                        <div>
                            <input type="checkbox" placeholder="Lembre de mim" id="rememberMe" />
                            <span>Lembre de mim</span>
                        </div>
                        <a href="#"><u>Esqueceu a senha?</u></a>
                    </CheckBox>

                    <Entrar
                        content={'Entrar'}
                        type="submit"
                        backgroundcolor={Theme.colors.pink}
                        color={Theme.colors.light}
                        onClick={handleCLick} />

                    <div>
                        <p> Novo usuário? <a href="/registro"><u>Registre-se aqui!</u></a></p>
                    </div>
                </Form>
            </LoginDiv>
            <Globals />
        </>
    )

}
