import React, { Fragment } from 'react';

import NavBar from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';

import './style.css';

const ManagementServiceReport = () => {
  return (
    <Fragment>
      <NavBar />
      <Sidebar />
      <div className="body_site">
        <h1>Relatorio de atendimento</h1>
      </div>
    </Fragment>
  );
};

export default ManagementServiceReport;
