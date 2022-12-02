import React, { Fragment } from 'react';

import NavBar from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';

import './style.css';

const ManagementAnalystPerformance = () => {
  return (
    <Fragment>
      <NavBar />
      <Sidebar />
      <div className="body_site">
        <h1>Performance de colaborador</h1>
      </div>
    </Fragment>
  );
};

export default ManagementAnalystPerformance;
