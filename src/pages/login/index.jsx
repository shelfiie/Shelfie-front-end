import { useContext, useState } from "react";
import { MyBookLogo } from "../../assets/logos/mybook-logo.tsx";
import { Logo } from "../../assets/logos/shelfie-logo.svg";
import { Input } from "../../components/globals/input.style.ts";
import { AuthContext } from "../../context/auth.jsx";
import { Globals } from "../../styles/globals";
import { Theme } from "../../styles/theme";
import { CheckBox, Entrar, Form, LoginDiv } from "./index.styles.ts";
import { Navigate } from "react-router-dom";
import { GoogleBooksService } from "../../api/services/GBookService.ts"

export function Login() {
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
        setLoading(true);

        const user = { email, password };
        const response = await signIn(user);
        console.log("signed: " + signed);
        console.log("response: " + response);
    }

    async function handleTeste(event) {
        event.preventDefault();
        const booksService = new GoogleBooksService();
        const response = await booksService.fetchBooksByParams({ 
            q: 'intitle:harry potter',
            maxResults: 10,
        })
        console.log(response);
    }

    if (signed) return <Navigate to="/home" />
    return (
        <>
            <LoginDiv backgroundcolor={Theme.colors.light}>
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
                        disabled={loading}
                        backgroundcolor={Theme.colors.pink}
                        color={Theme.colors.light}></Entrar>
                    <Entrar
                        content={'teste'}
                        type="submit"
                        backgroundcolor={Theme.colors.pink}
                        color={Theme.colors.light}
                        onClick={handleTeste}></Entrar>

                    <div>
                        <p> Novo usuário? <a href="/registro"><u>Registre-se aqui!</u></a></p>
                    </div>
                </Form>
            </LoginDiv>
            <Globals />
        </>
    )

}
