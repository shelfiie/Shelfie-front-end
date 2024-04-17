import styled, { createGlobalStyle } from "styled-components";
import { Theme } from "../../styles/theme";

const NotFoundGlobals = createGlobalStyle`
    html, body, #root{
        max-width: 100vw;
        max-height: 100vh;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow: hidden;
    }

`
const NotFoundWrapper = styled.div`
    font-family: ${Theme.font.family.poppins};
    height: 100vh;
    width: 100%;
    text-align: center;
    background-color: ${Theme.colors.light};

    a{  
        margin-top: 1rem;
        background-color: ${Theme.colors.orange};
        text-decoration: none;
        color: ${Theme.colors.light};
        padding: ${Theme.margins.marginhalfrem};
        border-radius: ${Theme.borders.radius};

        &:hover{
            filter: brightness(1.2);
        }
    }

`

const NotfoundText = styled.div`
    margin-top: -5rem;
    margin-bottom: 3rem;
    h1{
        font-size: ${Theme.font.sizes.big2x};
    }
`

export { NotFoundWrapper, NotFoundGlobals, NotfoundText }