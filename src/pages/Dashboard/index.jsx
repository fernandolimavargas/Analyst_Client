import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import NavBar from '../../components/navbar';
import DomCarousel from '../../components/carousel';
import QueueList from '../../components/queueList';
import Sidebar from '../../components/sidebar';
import ManagmentTable from '../../components/table/dashboard/managementAnalitic';
import DatabaseTable from '../../components/table/dashboard/databaseList';
import AnalystTpsList from '../../components/table/dashboard/analystTpsList';

import './style.css';

const Dashboard = () => {
  const tipo = JSON.parse(localStorage.getItem('user')).tipo;

  let initialTab;

  if (tipo == 'A') {
    initialTab = '2';
  } else {
    initialTab = '1';
  }

  const [tabListAnalyst, setTabListAnalyst] = useState(initialTab);
  const [tabListBases, setTabListBases] = useState('1');
  const [tabListType, setTabListType] = useState('2');

  const handleChangeTabListAnalyst = (event, newValue) => {
    setTabListAnalyst(newValue);
    setTabListType(newValue);
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
            {tipo == 'A' && <DomCarousel text="Solicitar" tipo="analyst" />}
            {tipo == 'H' && <DomCarousel text="Analisar" tipo="helper" />}
            {tipo == 'G' && <DomCarousel text="Visualizar" tipo="manager" />}
            {tipo == 'C' && <DomCarousel text="Visualizar" tipo="listing" />}
          </div>
        </div>
        <div className="row ajust-div px-3">
          <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
            <div className="row">
              <div className="col-12">
                <div className="div-card d-flex flex-row ">
                  <Box sx={{ width: '100%', height: '540px', fontSize: 12 }}>
                    <TabContext value={tabListAnalyst}>
                      <Box
                        sx={{
                          borderBottom: 1,
                          borderColor: 'divider',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <p className="title-card">Listagem de TPs</p>
                        <TabList
                          onChange={handleChangeTabListAnalyst}
                          textColor="secondary"
                          indicatorColor="secondary"
                        >
                          {tipo != 'A' && (
                            <Tab
                              label="Analítico"
                              value="1"
                              sx={{ fontSize: 12, textTransform: 'capitalize' }}
                            />
                          )}
                          <Tab
                            label="Geral"
                            value="2"
                            sx={{ fontSize: 12, textTransform: 'capitalize' }}
                          />
                          <Tab
                            label="Issue"
                            value="3"
                            sx={{ fontSize: 12, textTransform: 'capitalize' }}
                          />
                          <Tab
                            label="+15 dias"
                            value="4"
                            sx={{ fontSize: 12, textTransform: 'capitalize' }}
                          />
                          <Tab
                            label="Backlogs"
                            value="5"
                            sx={{ fontSize: 12, textTransform: 'capitalize' }}
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="1" style={{ padding: 5 }}>
                        <ManagmentTable />
                      </TabPanel>
                      <TabPanel value="2" style={{ padding: 0 }}>
                        <AnalystTpsList tabListType={tabListType} />
                      </TabPanel>
                      <TabPanel value="3" style={{ padding: 0 }}>
                        <AnalystTpsList tabListType={tabListType} />
                      </TabPanel>
                      <TabPanel value="4" style={{ padding: 0 }}>
                        <AnalystTpsList tabListType={tabListType} />
                      </TabPanel>
                      <TabPanel value="5" style={{ padding: 0 }}>
                        <AnalystTpsList tabListType={tabListType} />
                      </TabPanel>
                    </TabContext>
                  </Box>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="div-card">
                  <Box sx={{ width: '100%', fontSize: 12 }}>
                    <TabContext value={tabListBases}>
                      <Box
                        sx={{
                          borderBottom: 1,
                          borderColor: 'divider',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <p className="title-card">Lista de Bases dos Servidores</p>
                        <TabList
                          onChange={handleChangeTabListBases}
                          textColor="secondary"
                          indicatorColor="secondary"
                        >
                          <Tab
                            label="Bases Oracle"
                            value="1"
                            sx={{ fontSize: 12, textTransform: 'capitalize' }}
                          />
                          <Tab
                            label="Bases SQLServer"
                            value="2"
                            sx={{ fontSize: 12, textTransform: 'capitalize' }}
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="1" sx={{ padding: 0 }}>
                        <DatabaseTable tabListBases={tabListBases} />
                      </TabPanel>
                      <TabPanel value="2" sx={{ padding: 0 }}>
                        <DatabaseTable tabListBases={tabListBases} />
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
  );
};

export default Dashboard;
