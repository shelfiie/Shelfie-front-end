import { BookData } from "../../types/bookData"
import { AdminSpan, ItemWrapper, UserInformation } from "./admin-dashboard.styles";

type ReportsProps = {
    report: BookData['report'];
}

export const Reports = ({ report }: ReportsProps) => {

    return (
        <UserInformation>
            <ItemWrapper>
                <AdminSpan>Report Id: </AdminSpan>
                <p>{report?.reportId}</p>
            </ItemWrapper>

            <ItemWrapper>
                <AdminSpan>Book Id: </AdminSpan>
                <p>{report?.bookId}</p>
            </ItemWrapper>

            <ItemWrapper>
                <AdminSpan>Report Status: </AdminSpan>
                <p>{report?.reportStatus}</p>
            </ItemWrapper>

            <ItemWrapper>
                <AdminSpan>Review: </AdminSpan>
                <p>{report?.review}</p>
            </ItemWrapper>

            <ItemWrapper>
                <AdminSpan>Review Id: </AdminSpan>
                <p>{report?.reviewId}</p>
            </ItemWrapper>

            <ItemWrapper>
                <AdminSpan>User Id: </AdminSpan>
                <p>{report?.userId}</p>
            </ItemWrapper>

        </UserInformation>
    )
}