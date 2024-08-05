import { Aside } from "../../components/Aside/aside.tsx";
import { Paginometro } from "../../components/Paginometro/paginometro.tsx";
import { SearchBar } from "../../components/Search/search-bar.js";
import { Global, LayoutChildren, PageContent, SearchNContentWrapper, TopWrapper, Wrapper } from "./layout.styles.ts";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Global />
      <Wrapper id="wrapper-layout">
        <Aside />

        <SearchNContentWrapper id="search-content-wrapper">
          <TopWrapper id="top-wrapper">
            <SearchBar />
            <Paginometro />
          </TopWrapper>

          <PageContent id="page-content">
            <LayoutChildren id="layout-children">
              {children}
            </LayoutChildren>
          </PageContent>
        </SearchNContentWrapper>

      </Wrapper>
    </>
  )
}
