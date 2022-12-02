import React, { Fragment } from 'react';

import NavBar from '../../../../components/navbar';
import Sidebar from '../../../../components/sidebar';
import ListingHelpers from '../../../../components/table/listingHelpers';

import '../style.css';

const HelperListingError = () => {
  return (
    <Fragment>
      <NavBar />
      <Sidebar />
      <div className="body_site row">
        <div className="row">
          <span className="list-title">Listagem de Solicitações de Análise de Erros</span>
          <hr />
        </div>
        <div>
          <ListingHelpers typeSol="error" />
        </div>
      </div>
    </Fragment>
  );
};

export default HelperListingError;
