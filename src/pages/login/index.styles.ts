import styled from "styled-components"
import { BoxShadow } from "../../components/globals/Box.style"
import { Botao } from "../../components/globals/Button.style"
import { Theme } from "../../styles/theme"

const LoginDiv = styled(BoxShadow)`
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

const Form = styled.form`
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

const Entrar = styled(Botao)`
    gap: ${Theme.margins.margin1rem};
    margin: ${Theme.margins.margin2rem} 0  ;
    flex: 4;
`

export { LoginDiv, Form, CheckBox, Entrar }