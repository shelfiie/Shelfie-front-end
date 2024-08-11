import { useEffect, useState } from "react";
import { UserService } from "../../api/services/UserService";
import { Layout } from "../layout/layout"
import { UserData } from "../../types/userType";
import { AdminSpan, DashboardWrapper, ItemWrapper, PageWrapper, UserDiv, UserInformation, UsersWrapper } from "./admin-dashboard.styles";
import { Alert, Snackbar } from "@mui/material";
import { Botao } from "../../components/globals/Button.style";
import { Theme } from "../../styles/theme";
import { BookData } from "../../types/bookData";


export const AdminDashboard = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const userService = new UserService();

    const handlePromoteUser = async (id: BookData['id']) => {
        if (id) {
            const response = await userService.promoteUser(id);
            if (response.statusCode === 200) {
                setSuccess(response?.resolve);
                setTimeout(() => setSuccess(undefined), 3000);
                fetchUsers();
            } else {
                setError(response?.reject);
                setTimeout(() => setError(undefined), 3000);
            }
        }
    }

    const fetchUsers = async () => {
        const response = await userService.fetchAllUsers();

        setUsers(response?.body as UserData[]);
        console.log(response?.body);
    };

    useEffect(() => {
        fetchUsers();
    }, []);


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
        <Layout>
            <DashboardWrapper id="dashboard-wrapper">
                <h2>Admin Dashboard</h2>
                <PageWrapper id="page-wrapper" >
                    <UsersWrapper>
                        {users.map((user, index) => (
                            <UserDiv id="user-div" key={index}>
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
                            </UserDiv>
                        ))}
                    </UsersWrapper>

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
                </PageWrapper>
            </DashboardWrapper>
        </Layout>
    );
}