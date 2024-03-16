import styled from "styled-components";
import { MyBook } from "../../assets/logos/mybook-logo";
import { Logo } from "../../assets/logos/shelfie-logo.svg";
import { Input } from "../../components/globals/input.style";
import { Globals } from "../../styles/globals";
import { Theme } from "../../styles/theme";
import { Entrar, Form, LoginDiv } from "../login/index";

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
    return(
        <>
            <RegisterDiv>
                <div>
                    <MyBook>My Book</MyBook>
                    <Logo/>
                    <p>Registre-se para continuar para sua biblioteca digital</p>
                </div>
                <Form>
                    <label htmlFor="nome">Nome Completo</label>
                    <Input 
                        id="nome" 
                        type="text" 
                        placeholder="Digite seu nome completo"
                        />

                    <label htmlFor="email">E-mail</label>
                    <Input 
                        id="email" 
                        type="email" 
                        placeholder="Digite seu e-mail"/>

                    <label htmlFor="usuario">Usuário</label>
                    <Input 
                        id="usuario" 
                        type="text" 
                        placeholder="Digite o nome de usuário"/>

                    <label htmlFor="senha">Senha</label>
                    <Input 
                        id="senha" 
                        type="password" 
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