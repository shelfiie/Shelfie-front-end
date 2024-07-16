import styled from "styled-components";
import { Theme } from "../../styles/theme";

const UserDiv = styled.div`
    background-color: ${Theme.colors.white};
    padding: ${Theme.margins.margin1rem};
    border-radius: ${Theme.borders.radius};
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
    padding: ${Theme.margins.margin1rem};
    height: 100%;
`

export { UserDiv, PageWrapper, UsersWrapper, DashboardWrapper };