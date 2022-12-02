import React, { useState, useEffect, Fragment } from 'react';

import { warningMessage, errorMessage } from '../../../messages';

import { reqMovements } from '../../../../services/api';
import LoadingTables from '../../../loadingTables';

import './style.css';

const MovementsHelper = ({ idReq }) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (idReq) {
      reqMovements(idReq)
        .then((resp) => {
          setData(resp.data);
        })
        .catch((err) => {
          try {
            warningMessage(err.response.data.message, 'Aviso');
          } catch (err) {
            errorMessage('Status Desconhecido.', 'Erro');
          }
        });
    } else {
      reqMovements(localStorage.getItem('IdReq'))
        .then((resp) => {
          setData(resp.data);
        })
        .catch((err) => {
          try {
            warningMessage(err.response.data.message, 'Aviso');
          } catch (err) {
            errorMessage('Status Desconhecido.', 'Erro');
          }
        });
    }
  }, [idReq]);

  return (
    <Fragment>
      <div className="d-flex flex-column justify-content-start container-movements">
        {data == undefined ? (
          <LoadingTables />
        ) : (
          <Fragment>
            {data.map((item, index) => {
              return (
                <div key={index} className="content-movements">
                  <div className="d-flex justify-content-center">
                    <span className="title-movs">{item.title}</span>
                  </div>
                  <div className="d-flex justify-content-center">
                    <span className="infs-movs-dta">{item.dtaCreate}</span>
                  </div>
                  <div>
                    <span className="infs-movs">
                      Responsável: {item.analyst == '' ? item.helper : item.analyst}
                    </span>
                  </div>
                  <div>
                    <p className="infs-movs">Resumo: {item.resume}</p>
                  </div>
                </div>
              );
            })}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default MovementsHelper;
