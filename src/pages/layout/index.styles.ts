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
  width: 100vw;
  height: 100vh;

  display: grid;

  grid-template-columns: 1fr 7fr;
  background-color: ${Theme.colors.orange};
`
const PageContent = styled.div`
  width: 95%;
  height: 85%;
  position: relative;
  background-color: ${Theme.colors.light};

  border-radius: ${Theme.borders.radiusRound};
  border: .3rem solid ${Theme.colors.deep};
  margin-top: ${Theme.margins.margin2rem};

`

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: -1.5rem 0 0 2rem;
  position: absolute;
  width: 100%;

`

type LayoutChildrenProps = {
  height?: string;
}

const LayoutChildren = styled.div<LayoutChildrenProps>`
  padding: ${Theme.margins.margin2rem};
  height: ${(props) => props.height || '100%'};
`


export { Global, LayoutChildren, PageContent, TopWrapper, Wrapper };

