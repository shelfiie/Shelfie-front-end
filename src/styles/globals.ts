import { createGlobalStyle } from "styled-components";
import { Theme } from "./theme";
import bgVector from "../assets/bg-vector1.png"

export const Globals = createGlobalStyle`
    html{
        font-size: 62.5%;
        max-width: 100vw;
        max-height: 100vh;
        background-image: url(${bgVector});
        background-repeat: no-repeat;
        background-size: max(100vw, 90vh);
    }

    body, * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font: 1.2rem ${Theme.font.family.syne};
    }


    a {
    color: inherit;
    text-decoration: none;
    }

    label{
    display: block;
    text-align: left;
    }
`;