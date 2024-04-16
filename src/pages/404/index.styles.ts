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
    position: relative;
    font-family: ${Theme.font.family.poppins};
    height: 100vh;
    width: 100%;
    text-align: center;
    background-color: ${Theme.colors.light};

    h1{
        font-size: ${Theme.font.sizes.big2x};
    }

    a{
        background-color: ${Theme.colors.orange};
        text-decoration: none;
        color: ${Theme.colors.light};
        padding: ${Theme.margins.marginhalfrem};
        border-radius: ${Theme.borders.radius};

        &:hover{
            filter: brightness(1.2);
        }
    }

    svg{
        position: absolute;
        left: 0;
    }
`

export { NotFoundWrapper, NotFoundGlobals }