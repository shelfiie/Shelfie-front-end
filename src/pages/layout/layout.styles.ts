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
  display: flex;
  padding: 0 ${Theme.margins.margin1rem};
  background-color: ${Theme.colors.orange};
`

const PageContent = styled.div`
  width: 100%;
  height: 90%;
  background-color: ${Theme.colors.light};

  border-radius: ${Theme.borders.radiusRound};
  border: .3rem solid ${Theme.colors.deep};
  margin-top: ${Theme.margins.margin1rem};
`

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const SearchNContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 90%;
  flex: 6;
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

