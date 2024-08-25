import styled from "styled-components";
import { Theme } from "../../styles/theme";
import { ReportStatus } from "../../types/bookData";

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

const Status = styled.div < { $status?: ReportStatus } > `
background-color: ${({ $status }) => {
        switch ($status) {
            case ReportStatus.RESOLVIDO:
                return Theme.colors.green;
            case ReportStatus.RECUSADO:
                return Theme.colors.pink;
            case ReportStatus.PENDENTE:
                return Theme.colors.orange;
        }
    }};
    padding: 0 ${Theme.margins.marginhalfrem};
    border-radius: ${Theme.borders.radius};
    color: ${Theme.colors.white};
    font-weight: bold;
`

const TitleFilter = styled.div`
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    margin-bottom: ${Theme.margins.margin1rem};
`

export { UserDiv, PageWrapper, UsersWrapper, DashboardWrapper, UserInformation, AdminSpan, ItemWrapper, Status, TitleFilter };