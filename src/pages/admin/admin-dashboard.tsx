import { Layout } from "../layout/layout"
import { DashboardWrapper, PageWrapper, UserDiv, UsersWrapper } from "./admin-dashboard.styles";
import { useFetchAllUsers } from "../../api/hooks/useFetchAllUsers";
import { AllUsers } from "./all-users";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { TabListStyle } from "../home/home.style";
import { Tab } from "@mui/material";
import { useFetchAllReports } from "../../api/hooks/useFetchAllReports";
import { Reports } from "./reports";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';

export const AdminDashboard = () => {
    const { users, refetchUsers } = useFetchAllUsers();
    const { reports, refetchReports } = useFetchAllReports();

    const [value, setValue] = useState('1');

    return (
        <Layout>
            <DashboardWrapper id="dashboard-wrapper">
                <h2>Admin Dashboard</h2>
                <TabContext value={value}>
                    <TabList sx={TabListStyle} onChange={(_event, newValue) => setValue(newValue)} aria-label="simple tabs example">
                        <Tab label="Usuários" value='1' />
                        <Tab label="Denúncias" value='2' />
                    </TabList>

                    <TabPanel value='1'>
                        <h3>Todos os Usuários</h3>
                        <PageWrapper id="page-wrapper" >
                            <UsersWrapper>
                                {users.map((user, index) => (
                                    <UserDiv id="user-div" key={index}>
                                        <AllUsers user={user} refetchUsers={refetchUsers} />
                                    </UserDiv>
                                ))}
                            </UsersWrapper>
                        </PageWrapper>
                    </TabPanel>

                    <TabPanel value='2'>
                        <h3>Denúncias</h3>
                        <FilterAltRoundedIcon />
                        <PageWrapper id="page-wrapper" >
                            {reports.map((report, index) => (
                                <UserDiv key={index}>
                                    <Reports report={report}  />
                                </UserDiv>
                            ))}
                        </PageWrapper>
                    </TabPanel>
                </TabContext>
            </DashboardWrapper>
        </Layout>
    );
}