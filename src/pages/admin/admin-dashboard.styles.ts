import styled from "styled-components";
import { Theme } from "../../styles/theme";

const UserDiv = styled.div`
    background-color: ${Theme.colors.white};
    padding: ${Theme.margins.margin1rem};
    border-radius: ${Theme.borders.radius};
    display: flex;
    flex-direction: row;
    align-items: center;
    > button {
        flex: 1;
    }
`

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    height: 100%;
    `

const UsersWrapper = styled.div`
    display: inherit;
    flex-direction: column;
    gap: 1rem;
`

const DashboardWrapper = styled.div`
    height: 100%;
`

const UserInformation = styled.div`
    display: inherit;
    flex-direction: column;
    flex: 3;
`

const AdminSpan = styled.span`
    color: ${Theme.colors.lightDark};
`

const ItemWrapper = styled.div`
    display: inline-flex;
    gap: ${Theme.margins.marginhalfrem}
`

export { UserDiv, PageWrapper, UsersWrapper, DashboardWrapper, UserInformation, AdminSpan, ItemWrapper };