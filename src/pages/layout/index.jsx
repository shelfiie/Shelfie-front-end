import { Logo } from "../../assets/logos/shelfie-logo.svg";
import { Aside, Global, PageContent, Wrapper } from "./index.styles.ts";
import { MyBookLogo} from "../../assets/logos/mybook-logo.tsx";
import {Theme} from "../../styles/theme.ts";
import {SearchBar} from "../../components/globals/search/SearchBar.jsx";
import { Paginometro } from "../../components/globals/Paginometro.jsx";

export function Layout() {
  return (
      <>
      <Global/>
      <Wrapper>
            <Aside>
                <MyBookLogo color={Theme.colors.light} fontSize={Theme.font.sizes.small} fontWeight={Theme.font.weight.regular} />
                <Logo/>
                <a>Profile</a>
                <a>Home</a>
                <a>Bookmarks</a>
                <a>Settings</a>
            </Aside>
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
