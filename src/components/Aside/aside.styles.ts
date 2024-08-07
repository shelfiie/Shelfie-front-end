import styled from "styled-components";
import { Theme } from "../../styles/theme";

const AsideStyles = styled.aside`
    background-color: ${Theme.colors.orange};
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: ${Theme.margins.marginhalfrem};

    margin-top: ${Theme.margins.margin10rem};
    margin-bottom: ${Theme.margins.margin5rem};

    > div {
        text-align: center;
    }

    svg{width: 90%;}
`

const Nav = styled.nav`
    width: 90%;
`

const UlNav = styled.ul`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: ${Theme.margins.margin1rem};
    padding: ${Theme.margins.marginhalfrem};

    width: 100%;

    a {
        display: inherit;
        list-style: none;
        text-decoration: none;

        gap: ${Theme.margins.marginhalfrem};
        
        padding: ${Theme.margins.margin5px};
        
        &:hover{
            background-color: #FFAE47;
            color: ${Theme.colors.orange};
            border-radius: ${Theme.borders.radius};
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

export { AsideStyles, Nav, UlNav };

