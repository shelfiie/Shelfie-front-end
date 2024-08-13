import styled from "styled-components"
import { LoginDiv } from "../login/login-styles"
import { Theme } from "../../styles/theme"

const RegisterDiv = styled(LoginDiv)`
    @media (max-width: ${Theme.screen.desktopS}) {
        margin-top: 25rem;
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

const TemContaP = styled.p`
    margin-top: ${Theme.margins.margin2rem};

    a{
        cursor: pointer;
        margin-left: ${Theme.margins.margin5px};

        &:hover{
            color: inherit;
            text-decoration: underline;
        }
    }
`


export { RegisterDiv, TemContaP }