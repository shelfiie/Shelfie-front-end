import { useState } from "react";
import { Botao } from "../../components/globals/Button.style";
import { Theme } from "../../styles/theme";
import { UserData } from "../../types/userType";
import { AdminSpan, ItemWrapper, UserInformation } from "./admin-dashboard.styles";
import { BookData } from "../../types/bookData";
import { UserService } from "../../api/services/UserService";
import { Alert, Snackbar } from "@mui/material";

type AllUsersProps = {
    user: UserData;
    refetchUsers?: () => Promise<void>;
}

export const AllUsers = ({ user, refetchUsers }: AllUsersProps) => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const userService = new UserService();

    const handlePromoteUser = async (id: BookData['id']) => {
        if (id) {
            const response = await userService.promoteUser(id);
            if (response.statusCode === 200) {
                setSuccess(response?.resolve);
                setTimeout(() => setSuccess(undefined), 3000);
                refetchUsers && refetchUsers();
            } else {
                setError(response?.reject);
                setTimeout(() => setError(undefined), 3000);
            }
        }
    }



    const handleDisableUser = async (id: BookData['id']) => {
        if (id) {
            const response = await userService.disableUser(id);
            if (response.statusCode === 200) {
                setSuccess(response?.resolve);
                setTimeout(() => setSuccess(undefined), 3000);
            } else {
                setError(response?.reject);
                setTimeout(() => setError(undefined), 3000);
            }
        }
    }
    return (
        <>
            <UserInformation>
                <ItemWrapper>
                    <AdminSpan>Id: </AdminSpan> <p>{user.id}</p>
                </ItemWrapper>

                <ItemWrapper>
                    <AdminSpan>Papel: </AdminSpan> <p>{user.role}</p>
                </ItemWrapper>

                <ItemWrapper>
                    <AdminSpan>Email: </AdminSpan> <p>{user.email}</p>
                </ItemWrapper>

                <ItemWrapper>
                    <AdminSpan>Nickname: </AdminSpan> <p>{user.nickname}</p>
                </ItemWrapper>

                <ItemWrapper>
                    <AdminSpan>Nome: </AdminSpan> <p>{user.name}</p>
                </ItemWrapper>

                <ItemWrapper>
                    <AdminSpan>Habilitado: </AdminSpan> <p>{String(user.enabled)}</p>
                </ItemWrapper>
            </UserInformation>
            <div style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                <Botao
                    fontSize={Theme.font.sizes.xsmall}
                    color={Theme.colors.white}
                    borderRadius={Theme.borders.radius}
                    padding={`${Theme.margins.margin1rem} ${Theme.margins.marginhalfrem}`}
                    onClick={() => handlePromoteUser(user.id)}>
                    Promover ADMIN
                </Botao>
                <Botao
                    fontSize={Theme.font.sizes.xsmall}
                    color={Theme.colors.white}
                    borderRadius={Theme.borders.radius}
                    padding={`${Theme.margins.margin1rem} ${Theme.margins.marginhalfrem}`}
                    onClick={() => user.id && handleDisableUser(user.id)}>
                    Desabilitar
                </Botao>
            </div>

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