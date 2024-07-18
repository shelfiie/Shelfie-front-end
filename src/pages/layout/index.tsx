import { Aside } from "../../components/Aside/index.tsx";
import { Paginometro } from "../../components/Paginometro/index.tsx";
import { SearchBar } from "../../components/Search/search-bar.js";
import { Global, LayoutChildren, PageContent, TopWrapper, Wrapper } from "./index.styles.ts";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Global />
      <Wrapper>
        <Aside />

        <TopWrapper>
          <SearchBar />
          <Paginometro />
        </TopWrapper>
        
        <PageContent id="page-content">
          <LayoutChildren id="layout-children">
            {children}
          </LayoutChildren>

        </PageContent>
      </Wrapper>
    </>
  )
}
