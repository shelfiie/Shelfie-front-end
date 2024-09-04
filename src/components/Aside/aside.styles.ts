import styled from "styled-components";
import { Theme } from "../../styles/theme";

const AsideStyles = styled.aside`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${Theme.margins.margin1rem};
    padding: ${Theme.margins.marginhalfrem};
    margin-top: 20rem;
    margin-bottom: ${Theme.margins.margin5rem};

    > div {
        text-align: center;
    }

    svg{width: 90%;}
`

const Nav = styled.nav`
    width: 100%;
`

const UlNav = styled.ul`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: ${Theme.margins.margin1rem};
    padding: ${Theme.margins.marginhalfrem};

    width: 100%;

    a {
        border-radius: ${Theme.borders.radiusRound};
        background-color: ${Theme.colors.blue};
        display: inherit;
        list-style: none;
        text-decoration: none;
        gap: ${Theme.margins.marginhalfrem};
        padding: ${Theme.margins.margin1rem};
        transition: 0.3s all ease-in-out;
        
        &:hover{
            background-color: ${Theme.colors.deepBlue};
            color: ${Theme.colors.orange};
            border-radius: ${Theme.borders.radiusRound};
        }
        li {
            display: inherit;
            align-items: center;
            color: ${Theme.colors.light};
            font-size: ${Theme.font.sizes.xsmall};
            font-weight: ${Theme.font.weight.regular};
            font-family: ${Theme.font.family.poppins};
        } 

        svg {
            width: 48px;
            scale: 1.5;
        }
    }
`

const LogOutForm = styled.form`
    width: 100%;
    padding: 0 8px;
`

export { AsideStyles, Nav, UlNav, LogOutForm };

