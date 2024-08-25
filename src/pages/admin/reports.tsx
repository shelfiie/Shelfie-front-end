import { useState } from "react";
import { BookService } from "../../api/services/BookService";
import { Botao } from "../../components/globals/Button.style";
import { Theme } from "../../styles/theme";
import { BookData, ReportStatus } from "../../types/bookData"
import { AdminSpan, ItemWrapper, Status, UserInformation } from "./admin-dashboard.styles";
import { Alert, Snackbar } from "@mui/material";
import { StatusCode } from "../../api/client/IHttpClient";

type ReportsProps = {
    report: BookData['report'];
    refetchReports: () => void;
}

export const Reports = ({ report, refetchReports }: ReportsProps) => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined)


    const service = new BookService();
    const handleResolveReport = async () => {
        const response = await service.resolveReport(report?.reportId as string, ReportStatus.RESOLVIDO);

        if (response.statusCode === StatusCode.Ok) {
            setSuccess(response?.resolve)
            refetchReports();
        } else setError(response?.reject);

    }

    const handleRejectReport = async () => {
        const response = await service.resolveReport(report?.reportId as string, ReportStatus.RECUSADO);
        if(response.statusCode === StatusCode.Ok) {
            setSuccess(response?.resolve)
            refetchReports();
        } else setError(response?.reject);
    }

    return (
        <>
            <UserInformation>
                <ItemWrapper>
                    <AdminSpan>Review Id: </AdminSpan>
                    <p>{report?.reviewId}</p>
                </ItemWrapper>

                <ItemWrapper>
                    <AdminSpan>Report Status: </AdminSpan>
                    <Status $status={report?.reportStatus}>{report?.reportStatus}</Status>
                </ItemWrapper>

                <ItemWrapper>
                    <AdminSpan>User Id: </AdminSpan>
                    <p>{report?.userId}</p>
                </ItemWrapper>

                <ItemWrapper>
                    <AdminSpan>Review: </AdminSpan>
                    <p>{report?.review}</p>
                </ItemWrapper>


            </UserInformation>
            <div style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                <Botao
                    fontSize={Theme.font.sizes.xsmall}
                    color={Theme.colors.white}
                    borderRadius={Theme.borders.radius}
                    padding={`${Theme.margins.margin1rem} ${Theme.margins.marginhalfrem}`}
                    onClick={handleResolveReport}
                >
                    Aceitar Denúncia
                </Botao>
                <Botao
                    fontSize={Theme.font.sizes.xsmall}
                    color={Theme.colors.white}
                    borderRadius={Theme.borders.radius}
                    padding={`${Theme.margins.margin1rem} ${Theme.margins.marginhalfrem}`}
                    onClick={handleRejectReport}
                >
                    Rejeitar Denúncia
                </Botao>
            </div>

            {error && <Snackbar
                open={error !== undefined}
                autoHideDuration={4000}
                onClose={() => setError(undefined)}>
                <Alert
                    onClose={() => setError(undefined)}
                    severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>}

            {success && <Snackbar
                open={success !== undefined}
                autoHideDuration={4000}
                onClose={() => setSuccess(undefined)}>
                <Alert
                    onClose={() => setSuccess(undefined)}
                    severity="success" sx={{ width: '100%' }}>
                    {success}
                </Alert>
            </Snackbar>}
        </>
    )
}