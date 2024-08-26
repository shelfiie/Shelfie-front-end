import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material"
import { useState } from "react";
import { BookService } from "../../api/services/BookService";
import { ReportStatus } from "../../types/bookData";
import { StatusCode } from "../../api/client/IHttpClient";

type ConfirmDialogProps = {
    open: boolean;
    reportId: string;
    type: 'resolve' | 'reject' | undefined;
    handleConfirmDialog: () => void;
    refetchReports: () => void;
}

const ConfirmDialog = ({ open, type, handleConfirmDialog, reportId, refetchReports }: ConfirmDialogProps) => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const service = new BookService();
    const handleResolveReport = async () => {

        const response = await service.resolveReport(reportId as string, ReportStatus.RESOLVIDO);

        if (response.statusCode === StatusCode.Ok) {
            setSuccess(response?.resolve)
            refetchReports();
        } else setError(response?.reject);

    }

    const handleRejectReport = async () => {
        const response = await service.resolveReport(reportId as string, ReportStatus.RECUSADO);
        if (response.statusCode === StatusCode.Ok) {
            setSuccess(response?.resolve)
            refetchReports();
        } else setError(response?.reject);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleConfirmDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{type === 'resolve' ?
                    "Resolver Denúncia" : "Recusar Denúncia"}</DialogTitle>
                <DialogContent>
                    {type === 'resolve' ?
                        <p>Ao escolher resolver essa denúncia, a review em questão será desabilitada e não será mais visível aos usuários do sistema. Essa ação é irreversível.</p> :
                        <p>Ao recusar essa denúncia, nenhuma ação será realizada com a review em questão. Essa ação é irreversível.</p>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDialog}>Cancelar</Button>
                    {type === 'resolve' ?
                        <Button
                            onClick={handleResolveReport}
                            autoFocus>Resolver</Button> :
                        <Button
                            onClick={handleRejectReport}
                            autoFocus>Recusar</Button>}
                </DialogActions>
            </Dialog>
            {success &&
                <Snackbar
                    sx={{ marginRight: '4rem' }}
                    open={!!success}
                    autoHideDuration={5000}
                    onClose={() => setSuccess(undefined)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert severity="success">
                        {success}
                    </Alert>
                </Snackbar>}

            {error &&
                <Snackbar
                    sx={{ marginRight: '4rem' }}
                    open={!!error}
                    autoHideDuration={5000}
                    onClose={() => setError(undefined)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert severity="error">
                        {error}
                    </Alert>
                </Snackbar>}
        </>
    )
}

export { ConfirmDialog };