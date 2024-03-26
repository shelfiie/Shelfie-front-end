import { Logo } from "../../assets/logos/shelfie-logo.svg";
import {Aside, Global, PageContent, Wrapper} from "./styles";
import { MyBookLogo} from "../../assets/logos/mybook-logo.tsx";
import {Theme} from "../../styles/theme.ts";
import {SearchBar} from "../../components/globals/SearchBar.tsx";
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
                <SearchBar/>
              {/* <UserData/ */}
            </PageContent>
      </Wrapper>
      </>
  )
}
