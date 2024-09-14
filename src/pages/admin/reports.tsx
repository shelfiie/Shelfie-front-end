import { useState } from "react";
import { Botao } from "../../components/globals/Button.style";
import { Theme } from "../../styles/theme";
import { BookData } from "../../types/bookData"
import { AdminSpan, ItemWrapper, ReviewWrapper, Status, UserInformation } from "./admin-dashboard.styles";
import { Alert, Snackbar } from "@mui/material";
import { ConfirmDialog } from "./confirm-dialog";

type ReportsProps = {
    report: BookData['report'];
    refetchReports: () => void;
}

export const Reports = ({ report, refetchReports }: ReportsProps) => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [open, setOpen] = useState<boolean>(false);
    const [dialogType, setDialogType] = useState<'resolve' | 'reject'>();

    const handleConfirmDialog = () => setOpen(!open);

    return (
        <>
            <UserInformation>
                <ItemWrapper>
                    <AdminSpan>Status: </AdminSpan>
                    <Status $status={report?.reportStatus}>{report?.reportStatus}</Status>
                </ItemWrapper>

                <ItemWrapper>
                    <AdminSpan>ID da Review: </AdminSpan>
                    <p>{report?.reviewId}</p>
                </ItemWrapper>

                <ItemWrapper>
                    <AdminSpan>ID do usuário: </AdminSpan>
                    <p>{report?.userId}</p>
                </ItemWrapper>

                <ItemWrapper>
                    <AdminSpan>Review: </AdminSpan>
                    <ReviewWrapper>{report?.review}</ReviewWrapper>
                </ItemWrapper>


            </UserInformation>
            <div style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                <Botao
                    fontSize={Theme.font.sizes.xsmall}
                    color={Theme.colors.white}
                    borderRadius={Theme.borders.radius}
                    padding={`${Theme.margins.margin1rem} ${Theme.margins.marginhalfrem}`}
                    onClick={() => {
                        setDialogType('resolve');
                        handleConfirmDialog();
                    }}
                >
                    Resolver Denúncia
                </Botao>
                <Botao
                    fontSize={Theme.font.sizes.xsmall}
                    color={Theme.colors.white}
                    borderRadius={Theme.borders.radius}
                    padding={`${Theme.margins.margin1rem} ${Theme.margins.marginhalfrem}`}
                    onClick={() => {
                        setDialogType('reject');
                        handleConfirmDialog();
                    }}
                >
                    Recusar Denúncia
                </Botao>
            </div>

            <ConfirmDialog
                open={open}
                type={dialogType}
                reportId={report?.reportId ?? ''}
                handleConfirmDialog={handleConfirmDialog}
                refetchReports={refetchReports} />


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