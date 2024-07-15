import { Aside } from "../../components/Aside/index.jsx";
import { Paginometro } from "../../components/Paginometro/index.tsx";
import { SearchBar } from "../../components/Search/search-bar.js";
import { Global, LayoutChildren, PageContent, TopWrapper, Wrapper } from "./index.styles.ts";

export function Layout({ children }: { children: React.ReactNode }) {
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
