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

  grid-template-columns: 1fr 6fr;
  background-color: ${Theme.colors.orange};
`

const PageContent = styled.div`
  width: 90%;
  height: 90%;
  background-color: ${Theme.colors.light};

  border-radius: ${Theme.borders.radiusRound};
  border: .3rem solid ${Theme.colors.deep};
  margin-top: ${Theme.margins.margin1rem};
`

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;

`

const SearchNContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

type LayoutChildrenProps = {
  height?: string;
}

const LayoutChildren = styled.div<LayoutChildrenProps>`
  padding: ${Theme.margins.margin2rem};
  height: ${(props) => props.height || '100%'};
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: ${Theme.colors.deep} transparent;
  scroll-behavior: smooth;


`


export { Global, LayoutChildren, PageContent, TopWrapper, Wrapper, SearchNContentWrapper };

