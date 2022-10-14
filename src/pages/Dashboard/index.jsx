import React, { Fragment, useState } from "react"
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import NavBar from "../../components/navbar";
import DomCarousel from "../../components/carousel"
import QueueList from "../../components/queueList";
import Sidebar from "../../components/sidebar";
import ManagmentTable from "../../components/table/dashboard/managementAnalitic";
import DatabaseTable from "../../components/table/dashboard/databaseList"

import "./style.css"

const Dashboard = () => {
    const [tabListAnalyst, setTabListAnalyst] = useState("1");
    const [tabListBases, setTabListBases] = useState("1");

    const tipo = JSON.parse(localStorage.getItem("user")).tipo

    const handleChangeTabListAnalyst = (event, newValue) => {
        setTabListAnalyst(newValue);
    };

    const handleChangeTabListBases = (event, newValue) => {
        setTabListBases(newValue);
    };

    return (
        <Fragment>
            <NavBar />
            <Sidebar />
            <div className="body_site">
                <div className="row ajust-div">
                    <div className="col-12 container-carousel">
                        {tipo == 'A' && <DomCarousel text="Solicitar" tipo ="analyst"/>}
                        {tipo == 'H' && <DomCarousel text="Analisar" tipo ="helper"/>} 
                        {tipo == 'G' && <DomCarousel text="Visualizar" tipo ="manager"/>}
                        {tipo == 'C' && <DomCarousel text="Visualizar" tipo ="listing"/>}
                    </div>
                </div>
                <div className="row ajust-div px-3">
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
                        <div className="row">
                            <div className="col-12">
                                <div className="div-card d-flex flex-row " >
                                    <Box sx={{ width: "100%", height: "430px", fontSize: 12}} >
                                        <TabContext value={tabListAnalyst}>
                                            <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "space-between" }}>
                                                <p className="title-card">Listagem de TPs</p>
                                                <TabList onChange={handleChangeTabListAnalyst}
                                                    textColor="secondary"
                                                    indicatorColor="secondary"
                                                >
                                                    <Tab label="Analítico" value="1" sx={{ fontSize: 12, textTransform: "capitalize" }} />
                                                    <Tab label="Geral" value="2" sx={{ fontSize: 12, textTransform: "capitalize" }} />
                                                    <Tab label="Issue" value="3" sx={{ fontSize: 12, textTransform: "capitalize" }} />
                                                    <Tab label="+15 dias" value="4" sx={{ fontSize: 12, textTransform: "capitalize" }} />
                                                    <Tab label="Backlogs" value="5" sx={{ fontSize: 12, textTransform: "capitalize" }} />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="1" style={{ padding: 5 }}>
                                                <ManagmentTable/>
                                            </TabPanel>
                                            <TabPanel value="2">Geral</TabPanel>
                                            <TabPanel value="3">Issue</TabPanel>
                                            <TabPanel value="4">Mais 15</TabPanel>
                                            <TabPanel value="5">Backlog</TabPanel>
                                        </TabContext>
                                    </Box>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="div-card">
                                    <Box sx={{ width: "100%", fontSize: 12}} >
                                        <TabContext value={tabListBases}>
                                            <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "space-between" }}>
                                                <p className="title-card">Lista de bases dos servidores</p>
                                                <TabList onChange={handleChangeTabListBases}
                                                    textColor="secondary"
                                                    indicatorColor="secondary"
                                                >
                                                    <Tab label="Bases Oracle" value="1" sx={{ fontSize: 12, textTransform: "capitalize" }} />
                                                    <Tab label="Bases SQLServer" value="2" sx={{ fontSize: 12, textTransform: "capitalize" }} />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="1" sx={{padding: 0}}>
                                                <DatabaseTable tabListBases={tabListBases}/>
                                            </TabPanel>
                                            <TabPanel value="2" sx={{padding: 0}}>
                                                <DatabaseTable tabListBases={tabListBases}/>
                                            </TabPanel>
                                        </TabContext>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-2">
                        <div className="div-card">
                            <QueueList />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard;
