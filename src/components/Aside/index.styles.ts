import styled from "styled-components";
import { Theme } from "../../styles/theme";

const AsideStyles = styled.aside`
    background-color: ${Theme.colors.orange};
    display: flex;
    flex-direction: column;
    align-items: center;
    
    margin-top: ${Theme.margins.margin10rem};

    ul{
        display: flex;
        flex-direction: column;
        gap: ${Theme.margins.margin1rem};
        padding: ${Theme.margins.margin1rem};

        width: 100%;

        li {
            list-style: none;
            display: inherit;
            align-items: center;
            gap: ${Theme.margins.marginhalfrem};

            padding: ${Theme.margins.marginhalfrem};

            &:hover{
                background-color: #FFAE47;
                color: ${Theme.colors.orange};
                border-radius: ${Theme.borders.radius};
            }

            a {
                text-decoration: none;
                color: ${Theme.colors.light};
                font-size: ${Theme.font.sizes.small};
                font-weight: ${Theme.font.weight.regular};
                font-family: ${Theme.font.family.poppins};
            } 

            img {width: 48px;}
        }
    }



    svg{width: 80%;}
`

export { AsideStyles };

