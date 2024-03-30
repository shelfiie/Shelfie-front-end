import styled, { createGlobalStyle } from "styled-components";
import { Theme } from "../../styles/theme";

const Global = createGlobalStyle`
  html{
    overflow: hidden;
  }
  *{
    font-family: ${Theme.font.family.syne};
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;

    display: grid;

    grid-template-columns: 1fr 6fr;
    background-color: ${Theme.colors.orange};
`
const PageContent = styled.div`
    width: 95%;
    height: 90%;
    position: relative;
    background-color: ${Theme.colors.light};

    border-radius: ${Theme.borders.radiusRound};
    border: .3rem solid ${Theme.colors.deep};
    margin-top: ${Theme.margins.margin2rem};

`


export { Global, PageContent, Wrapper };
