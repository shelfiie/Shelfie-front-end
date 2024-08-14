import styled from "styled-components"
import { BoxShadow } from "../../components/globals/Box.style"
import { Theme } from "../../styles/theme"

const LoginDiv = styled(BoxShadow)`
    width: 42rem;
    object-fit: cover;

    padding: ${Theme.margins.margin5rem};
    margin: 0 auto;
    margin-top: 15rem;

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

    label{
        font-weight: ${Theme.font.weight.medium};
        margin-bottom: ${Theme.margins.marginhalfrem};
    }
`
const CheckBox = styled.div`
    display: inherit;
    justify-content: space-between;
    gap: 3px;
    margin-top: ${Theme.margins.margin2rem};
    margin-bottom: ${Theme.margins.margin2rem};
    * {
        color: ${Theme.colors.dark};
        display: inherit;
        gap: .6rem;
    }
`

const ItemsForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${Theme.margins.margin1rem};
`


export { LoginDiv, Form, CheckBox, ItemsForm }