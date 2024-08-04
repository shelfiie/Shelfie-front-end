import { Alert, Button, Dialog, DialogActions, DialogTitle, Snackbar } from "@mui/material"
import { StatusCode } from "../../api/client/IHttpClient";
import { BookData } from "../../types/bookData";
import { BookService } from "../../api/services/BookService";
import { useState } from "react";

type DialogProps = {
    myBookId: BookData['id'];
    open: boolean;
    handleDeleteDialog: () => void;
}

const DeleteDialog = ({ open, handleDeleteDialog, myBookId }: DialogProps) => {
    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();

    const handleDisable = async () => {
        const bookService = new BookService();
        const response = await bookService.disableBook(myBookId ?? '');

        if (response.statusCode === StatusCode.Ok) {
            setSuccess(response?.resolve);
            setTimeout(() => setSuccess(undefined), 3000);
            handleDeleteDialog();
            window.location.reload();
        } else {
            setError(response?.reject);
            setTimeout(() => setError(undefined), 3000);
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Você tem certeza que deseja deletar esse livro?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDeleteDialog}>Cancelar</Button>
                    <Button onClick={handleDisable} autoFocus>Deletar</Button>
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

export { DeleteDialog }