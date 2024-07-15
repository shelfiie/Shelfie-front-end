import { useContext, useState } from "react";
import { AuthContext } from "../api/context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export const PrivateRoute = () => {
    const { signed } = useContext(AuthContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        navigate('/');
    };

    return (
        !signed ? (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Usuário não autenticado"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Você precisa se autenticar para acessar essa página.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

        ) : (
            <Outlet />
        )
    )
}