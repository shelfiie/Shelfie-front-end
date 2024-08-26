import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Tooltip } from "@mui/material"
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { Theme } from "../../styles/theme";
import { BookService } from "../../api/services/BookService";
import { BookData } from "../../types/bookData";
import { useState } from "react";
import { StatusCode } from "../../api/client/IHttpClient";

export type ReportReviewProps = {
    reviewId: string;
}


export const ReportReview = ({ reviewId }: ReportReviewProps) => {
    const [success, setSuccess] = useState<string | null>();
    const [error, setError] = useState<string | null>();
    const [open, setOpen] = useState<boolean>(false);
    const service = new BookService();


    const handleReport = async () => {
        const response = await service.reportReview(reviewId as BookData['report']);
        if (response.statusCode === StatusCode.Created) {
            setSuccess(response.resolve);
            handleReportDialog();
        } else {
            setError(response.reject);
            handleReportDialog();

        }
    }

    const handleReportDialog = () => setOpen(!open);

    return (
        <>
            <Tooltip title="Denunciar avaliação" placement="bottom">
                <WarningAmberRoundedIcon
                    onClick={handleReportDialog}
                    sx={{ fill: `${Theme.colors.pink}` }} />
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleReportDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Você tem certeza que deseja denunciar essa review?"}</DialogTitle>
                <DialogContent>
                    Se você acredita que essa review vai contra nossas políticas de privacidade, por favor, denuncie.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReportDialog}>Cancelar</Button>
                    <Button onClick={handleReport} autoFocus>Denunciar</Button>
                </DialogActions>
            </Dialog>
            {error &&
                <Snackbar
                    sx={{ marginRight: '4rem' }}
                    open={!!error}
                    autoHideDuration={4000}
                    onClose={() => setError(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert severity='error'>{error}</Alert>
                </Snackbar>}

            {success &&
                <Snackbar
                    sx={{ marginRight: '4rem' }}
                    open={!!success}
                    autoHideDuration={4000}
                    onClose={() => setSuccess(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert severity='success'>{success}</Alert>
                </Snackbar>}
        </>
    )
}