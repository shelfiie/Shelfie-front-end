import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar
} from "@mui/material";
import {useState} from "react";
import {BookService} from "../../api/services/BookService.ts";
import {StatusCode} from "../../api/client/IHttpClient.ts";

type DeleteProgressionDialogType = {
    dialogOpen: boolean;
    handleDialog: () => void;
    progressionId: string;
    refetchProgressions?: () => void;
}

export const DeleteProgressionDialog = ({ handleDialog, dialogOpen, progressionId, refetchProgressions } : DeleteProgressionDialogType) => {
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleDeleteProgression = async () => {
        const service = new BookService();
        const response = await service.deleteProgression(progressionId as string);
        if (response.statusCode === StatusCode.Ok) {
            setSuccess(response.resolve);
            setTimeout(() => {
                refetchProgressions && refetchProgressions();
                setSuccess(undefined);
                handleDialog();
            }, 2000);
        } else {
            setError(response.reject);
            setTimeout(() => {
                setError(undefined);
                handleDialog();
            })
        }
    }

    return (
        <>
            <Dialog
                open={dialogOpen}
                onClose={handleDialog}
            >
                <DialogTitle>Deletar Progressão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja realmente deletar esta progressão? Essa ação não poderá ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteProgression} color="primary" autoFocus>
                        Deletar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!success}
                autoHideDuration={4000}
                onClose={() => setSuccess(undefined)}>
                <Alert severity="success">{success}</Alert>
            </Snackbar>

            <Snackbar
                open={!!error}
                autoHideDuration={4000}
                onClose={() => setError(undefined)}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </>
    )
}