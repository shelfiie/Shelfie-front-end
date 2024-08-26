import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material"
import { StatusCode } from "../../api/client/IHttpClient";
import { useContext, useState } from "react";
import { UserData } from "../../types/userType";
import { UserService } from "../../api/services/UserService";
import { AuthContext } from "../../api/context/auth";

type DialogProps = {
    open: boolean;
    handleDeleteDialog: () => void;
}

const DeleteDialog = ({ open, handleDeleteDialog }: DialogProps) => {
    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const { logout } = useContext(AuthContext)
    
    const handleDisable = async () => {
        const service = new UserService();
        const response = await service.disableMe();

        if (response.statusCode === StatusCode.Ok) {
            setSuccess(response?.resolve);
            setTimeout(() => setSuccess(undefined), 3000);
            handleDeleteDialog();
            logout();
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
                <DialogTitle id="alert-dialog-title">{"Você tem certeza que deseja deletar a sua conta?"}</DialogTitle>
                <DialogContent>
                    Essa ação é irreversível.
                </DialogContent>
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