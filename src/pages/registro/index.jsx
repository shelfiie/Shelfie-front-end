import styled from "styled-components";
import { Logo } from "../../assets/logos/shelfie-logo.svg";
import { Input } from "../../components/globals/input.style.ts";
import { Globals } from "../../styles/globals";
import { Theme } from "../../styles/theme";
import { Entrar, Form, LoginDiv } from "../login/index.jsx";
import {MyBookLogo} from "../../assets/logos/mybook-logo.tsx";

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


export function Registro(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(e){
        const {name, value} = e.target;
        if(name === 'name') setName(value);
        if(name === 'email') setEmail(value);
        if(name === 'user') setUser(value);
        if(name === 'password') setPassword(value);
    }

    function handleRegister(event){
        event.preventDefault();
    
        const user = {
            name,
            email,
            user,
            password
        }

        registerUser(user);
        console.log(user);
    }

    return(
        <>
            <RegisterDiv>
                <div>
                    <MyBookLogo />
                    <Logo/>
                    <p>Registre-se para continuar para sua biblioteca digital</p>
                </div>
                <Form>
                    <label htmlFor="nome">Nome Completo</label>
                    <Input 
                        id="name" 
                        name="name"
                        type="text" 
                        value={name}
                        onChange={handleChange}
                        placeholder="Digite seu nome completo"
                        />

                    <label htmlFor="email">E-mail</label>
                    <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={email} 
                        onChange={handleChange}
                        placeholder="Digite seu e-mail"/>

                    <label htmlFor="usuario">Usuário</label>
                    <Input 
                        id="user"
                        name="user" 
                        type="text" 
                        value={user}
                        onChange={handleChange}
                        placeholder="Digite o nome de usuário"/>

                    <label htmlFor="senha">Senha</label>
                    <Input 
                        id="password"
                        name="password" 
                        type="password"
                        value={password} 
                        onChange={handleChange}
                        placeholder="Digite sua senha"/>

                    <Entrar 
                        content="Registrar"
                        type="submit" 
                        backgroundColor={Theme.colors.pink} 
                        color={Theme.colors.light} 
                    />
                </Form>
                <p>Já tem uma conta? <a href="/"> <u> Entre aqui </u></a></p>
            </RegisterDiv>
            <Globals/>
        </>
    );
}