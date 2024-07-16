import { useEffect, useState } from "react";
import { UserService } from "../../api/services/UserService";
import { Layout } from "../layout"
import { UserData } from "../../types/userType";
import { DashboardWrapper, PageWrapper, UserDiv, UsersWrapper } from "./admin-dashboard.styles";
import { Pagination } from "@mui/material";
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
            // Supondo que a resposta seja um array de usuários
            setUsers(response?.body as UserData[]);
            // Define o total de páginas baseado no tamanho da resposta e pageSize
            setTotalPages(Math.ceil((response?.body as any[]).length / pageSize));
        };
        fetchUsers();
    }, []);

    const handleChange = (event, value) => {
        setPage(value);
    };

    // Calcula os usuários a serem exibidos na página atual
    const usersToDisplay = users.slice((page - 1) * pageSize, page * pageSize);

    return (
        <Layout>
            <DashboardWrapper id="dashboard-wrapper">
                <h2>Admin Dashboard</h2>
                <PageWrapper id="page-wrapper" >
                    <UsersWrapper>
                        {usersToDisplay.map((user, index) => (
                            <UserDiv key={index}>
                                <p>{user.id}</p>
                                <p>{user.role}</p>
                                <p>{user.email}</p>
                                <p>{user.nickname}</p>
                                <p>{user.name}</p>
                            </UserDiv>
                        ))}
                    </UsersWrapper>

                    <Pagination id="pagination" sx={{ display: 'flex', justifyContent: 'center' }} count={totalPages} page={page} onChange={handleChange} />
                </PageWrapper>
            </DashboardWrapper>
        </Layout>
    );
}