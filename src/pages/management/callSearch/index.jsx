import React, { Fragment } from 'react';

import NavBar from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';

import './style.css';

const ManagementCallSearch = () => {
  return (
    <Fragment>
      <NavBar />
      <Sidebar />
      <div className="body_site">
        <h1>Consulta de chamados</h1>
      </div>
    </Fragment>
  );
};

export default ManagementCallSearch;
