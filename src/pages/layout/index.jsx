import { Aside } from "../../components/Aside/index.jsx";
import { Paginometro } from "../../components/Paginometro/index.jsx";
import { SearchBar } from "../../components/search/SearchBar.jsx";
import { Global, PageContent, Wrapper } from "./index.styles.ts";

export function Layout() {
  return (
      <>
      <Global/>
      <Wrapper>
        <Aside />
            <PageContent>
                <div>
                  <SearchBar/>
                  <Paginometro />
                </div>
            </PageContent>
      </Wrapper>
      </>
  )
}
