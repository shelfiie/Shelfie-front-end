import { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MyBookLogo } from "../../assets/logos/mybook-logo.tsx";
import { Logo } from "../../assets/logos/shelfie-logo.svg";
import { Input } from "../../components/globals/input.style.ts";
import { AuthContext } from "../../context/auth.jsx";
import { Globals } from "../../styles/globals";
import { Theme } from "../../styles/theme";
import { validarEmail, validarSenha } from "../../utils/validadores";
import { CheckBox, Entrar, Form, LoginDiv } from "./index.styles.ts";

export function Login() {

    const validarInput = () => {
        return validarEmail(email) && validarSenha(password);
    }

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, signed } = useContext(AuthContext);


    function handleChange(e) {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    async function handleSignIn(event) {
        event.preventDefault();
        console.log("passando pelo login, valor do signed: " + signed)
        setLoading(true);

        const user = { email, password };
        await signIn(user);

        setLoading(false);
    }
    return (
        <>
            <LoginDiv>
                <div>
                    <MyBookLogo />
                    <Logo />
                    <p>Entre para continuar para sua biblioteca digital</p>
                </div>
                <Form onSubmit={handleSignIn}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input required
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            placeholder="Digite seu e-mail"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Senha</label>
                        <Input required
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            placeholder="Digite sua senha"
                            onChange={handleChange}
                        />
                    </div>

                    <CheckBox>
                        <div>
                            <input type="checkbox" placeholder="Lembre de mim" id="rememberMe" />
                            <span>Lembre de mim</span>
                        </div>
                        <a href="#"><u>Esqueceu a senha?</u></a>
                    </CheckBox>

                    <Entrar
                        content={loading ? 'Carregando' : 'Entrar'}
                        type="submit"
                        disabled={loading || !validarInput()}
                        backgroundColor={Theme.colors.pink}
                        color={Theme.colors.light}></Entrar>

                    <div>
                        <p> Novo usuário? <a href="/registro"><u>Registre-se aqui!</u></a></p>
                    </div>
                </Form>
            </LoginDiv>
            <Globals />
        </>
    )
}
