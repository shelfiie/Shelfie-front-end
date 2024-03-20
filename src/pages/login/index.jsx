import styled from "styled-components";
import { BoxShadow } from "../../components/globals/box.style";
import { Botao } from "../../components/globals/button.style";
import { Theme } from "../../styles/theme";
import { Globals } from "../../styles/globals";
import { Logo } from "../../assets/logos/shelfie-logo.svg";
import { MyBook } from "../../assets/logos/mybook-logo";
import {useContext, useState} from "react";
import { validarEmail, validarSenha } from "../../utils/validadores";
import { Input } from "../../components/globals/input.style";
import {AuthContext} from "../../context/auth.jsx";
import {Navigate} from "react-router-dom";


export const LoginDiv = styled(BoxShadow)`
    width: 42rem;
    object-fit: cover  ;
    background-color: ${Theme.colors.light};

    padding: ${Theme.margins.margin5rem};
    margin: 0 auto;
    margin-top: ${Theme.margins.margin7rem};

    > div{
        margin: ${Theme.margins.margin5rem} 0 ${Theme.margins.margin6rem} 0;
    }

    @media (max-width: ${Theme.screen.desktopS}){
        >div {
            margin: ${Theme.margins.margin3rem} 0 ${Theme.margins.margin4rem} 0;
        
        }
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: ${Theme.margins.margin5rem};
    
    input {margin-bottom: ${Theme.margins.margin1rem};}

    label{
        font-weight: ${Theme.font.weight.medium};
        margin-bottom: ${Theme.margins.marginhalfrem};
    }

    :nth-child(5) * {
        color: ${Theme.colors.dark};
        margin-top: ${Theme.margins.margin1rem};
    }
`
const CheckBox = styled.div`
    display: inherit;
    justify-content: space-between;
    gap: 3px;
    margin-top: ${Theme.margins.margin2rem};

    * {
        color: ${Theme.colors.dark};
        display: inherit;
        gap: .6rem;
    }
`

export const Entrar = styled(Botao)`
    gap: ${Theme.margins.margin1rem};
    margin: ${Theme.margins.margin2rem} 0  ;
    flex: 4;
`

export function Login() {
    const validarInput = () => {
        return validarEmail(email) && validarSenha(password);
    }
    
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, signEd } = useContext(AuthContext);


    function handleChange(e){
        const { name, value } = e.target;
        if(name === 'email') {
            setEmail(value);
        } else if(name === 'password'){
            setPassword(value);
        }
    }

    async function handleSignIn(event){
        event.preventDefault();
        setLoading(true);
        const user = { email, password };
        await signIn(user);
        setLoading(false);
    }

    if (signEd){
        return  <Navigate to={'/home'} />
    } else{
        return (
            <>
                <LoginDiv>
                    <div>
                        <MyBook>My Book</MyBook>
                        <Logo/>
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
                            content={ loading ? 'Carregando' : 'Entrar' }
                            type="submit"
                            disabled={ loading || !validarInput()}
                            backgroundColor={Theme.colors.pink}
                            color={Theme.colors.light}></Entrar>

                        <div>
                            <p> Novo usuário? <a href="/registro"><u>Registre-se aqui!</u></a></p>
                        </div>
                    </Form>
                </LoginDiv>
                <Globals/>
            </>
        )
    }
}
