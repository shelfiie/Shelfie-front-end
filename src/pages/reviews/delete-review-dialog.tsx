import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material"
import { BookData } from "../../types/bookData";
import { BookService } from "../../api/services/BookService";
import { useState } from "react";
import { StatusCode } from "../../api/client/IHttpClient";

type DeleteReviewDialogProps = {
    deleteDialogOpen: boolean;
    handleDialog: () => void;
    reviewId: BookData['reviews'];
    refetchReviews?: () => void;
}

export const DeleteReviewDialog = ({ deleteDialogOpen, handleDialog, reviewId, refetchReviews }: DeleteReviewDialogProps) => {

    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleDeleteClick = async () => {
        const service = new BookService();
        const response = await service.deleteReview(reviewId as string);
        if (response.statusCode === StatusCode.Accepted) {
            setSuccess(response.resolve);
            setTimeout(() => {
                refetchReviews && refetchReviews();
                setSuccess(undefined);
                handleDialog();
            }, 2000);
            return;
        } else {
            setError(response.reject);
            setTimeout(() => {
                setError(undefined);
                handleDialog();
            }, 2000);
            return;
        }
    }

    return (
        <>
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteClick}
            >
                <DialogTitle>Deletar Avaliação</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja realmente deletar esta avaliação? Essa ação não poderá ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteClick} color="primary" autoFocus>
                        Deletar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!success}
                autoHideDuration={6000}
                onClose={() => setSuccess(undefined)}>
                <Alert severity="success">{success}</Alert>
            </Snackbar>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(undefined)}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </>

    )
}