import { Aside } from "../../components/Aside/index.jsx";
import { Paginometro } from "../../components/Paginometro/index.jsx";
import { SearchBar } from "../../components/search/SearchBar.jsx";
import { Global, LayoutChildren, PageContent, TopWrapper, Wrapper } from "./index.styles.ts";

export function Layout( { children } ) {
  return (
    <>
      <Global />
      <Wrapper>
        <Aside />
        <PageContent>

          <TopWrapper>
            <SearchBar />
            <Paginometro />
          </TopWrapper>

          <LayoutChildren>
            {children}
          </LayoutChildren>

        </PageContent>
      </Wrapper>
    </>
  )
}
