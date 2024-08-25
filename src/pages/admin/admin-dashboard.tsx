import { Layout } from "../layout/layout"
import { DashboardWrapper, PageWrapper, TitleFilter, UserDiv, UsersWrapper } from "./admin-dashboard.styles";
import { useFetchAllUsers } from "../../api/hooks/useFetchAllUsers";
import { AllUsers } from "./all-users";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { TabListStyle } from "../home/home.style";
import { Tab } from "@mui/material";
import { useFetchAllReports } from "../../api/hooks/useFetchAllReports";
import { Reports } from "./reports";
import { FilterReports } from "../../components/filter/filter-reports";
import { BookData, ReportStatus } from "../../types/bookData";

export const AdminDashboard = () => {
    const { users, refetchUsers } = useFetchAllUsers();
    const { reports, refetchReports } = useFetchAllReports();

    const [value, setValue] = useState('1');
    const [filterStatus, setFilterStatus] = useState<string>('TODOS');

    const handleFilterChange = (status: ReportStatus) => setFilterStatus(status);

    const filteredReports = reports.filter((report: BookData['report']) => {
        if (filterStatus === ReportStatus.TODOS) return true;
        return report?.reportStatus === filterStatus;
    });

    return (
        <Layout>
            <DashboardWrapper id="dashboard-wrapper">
                <h2>Admin Dashboard</h2>
                <TabContext value={value}>
                    <TabList sx={TabListStyle} onChange={(_event, newValue) => setValue(newValue)} aria-label="simple tabs">
                        <Tab label="Usuários" value='1' />
                        <Tab label="Denúncias" value='2' />
                    </TabList>

                    <TabPanel value='1'>
                        <TitleFilter>
                            <h3>Todos os Usuários</h3>
                        </TitleFilter>
                        <PageWrapper id="page-wrapper" >
                            <UsersWrapper id="users-wrapper">
                                {users.map((user, index) => (
                                    <UserDiv id="user-div" key={index}>
                                        <AllUsers user={user} refetchUsers={refetchUsers} />
                                    </UserDiv>
                                ))}
                            </UsersWrapper>
                        </PageWrapper>
                    </TabPanel>

                    <TabPanel value='2'>
                        <TitleFilter>
                            <h3>Denúncias</h3>
                            <FilterReports onFilterChange={handleFilterChange} />
                        </TitleFilter>
                        <PageWrapper id="page-wrapper" >
                            <UsersWrapper id="users-wrapper">
                                {filteredReports.length > 0 ? (
                                    filteredReports.map((report, index) => (
                                        <UserDiv id="user-div" key={index}>
                                            <Reports report={report} refetchReports={refetchReports} />
                                        </UserDiv>
                                    ))
                                ) : (
                                    <p>Nenhuma denúncia encontrada!</p>
                                )}
                            </UsersWrapper>
                        </PageWrapper>
                    </TabPanel>
                </TabContext>
            </DashboardWrapper>
        </Layout>
    );
}