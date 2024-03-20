import { Logo } from "../../assets/logos/shelfie-logo.svg";
import { Aside, PageContent, Wrapper } from "./styles";

export function Layout() {
  return (
    <>
        <Wrapper>
            <Aside>
                <Logo/>
                <h1>testando aside</h1>
            </Aside>
            <PageContent>
              {/* <UserData/ */}
            </PageContent>
        </Wrapper>
    </>
  )
}
