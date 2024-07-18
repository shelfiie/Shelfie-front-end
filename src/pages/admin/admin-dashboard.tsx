import { SetStateAction, useEffect, useState } from "react";
import { UserService } from "../../api/services/UserService";
import { Layout } from "../layout"
import { UserData } from "../../types/userType";
import { AdminSpan, DashboardWrapper, ItemWrapper, PageWrapper, UserDiv, UserInformation, UsersWrapper } from "./admin-dashboard.styles";
import { Pagination } from "@mui/material";
import { Botao } from "../../components/globals/Button.style";
import { Theme } from "../../styles/theme";


export const AdminDashboard = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 4; // Número de usuários por página
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            const userService = new UserService();
            const response = await userService.fetchAllUsers();
            console.log(response);

            setUsers(response?.body as UserData[]);

            setTotalPages(Math.ceil((response?.body as any[]).length / pageSize));
        };
        fetchUsers();
    }, []);

    const handleChange = (event: any, value: SetStateAction<number>) => setPage(value);

    const usersToDisplay = users.slice((page - 1) * pageSize, page * pageSize);

    return (
        <Layout>
            <DashboardWrapper id="dashboard-wrapper">
                <h2>Admin Dashboard</h2>
                <PageWrapper id="page-wrapper" >
                    <UsersWrapper>
                        {usersToDisplay.map((user, index) => (
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
                                    {/* <p>{user.role}</p>
                                    <p>{user.email}</p>
                                    <p>{user.nickname}</p>
                                    <p>{user.name}</p>
                                    <p>{String(user.enabled)}</p> */}
                                </UserInformation>
                                <div>
                                    <Botao
                                        fontSize={Theme.font.sizes.xsmall}
                                        color={Theme.colors.white}
                                        borderRadius={Theme.borders.radius}
                                        padding={`${Theme.margins.margin1rem} ${Theme.margins.margin2rem}`} >
                                        Desabilitar
                                    </Botao>
                                </div>
                            </UserDiv>
                        ))}
                    </UsersWrapper>

                    <Pagination id="pagination" sx={{ display: 'flex', justifyContent: 'center' }} count={totalPages} page={page} onChange={handleChange} />
                </PageWrapper>
            </DashboardWrapper>
        </Layout>
    );
}