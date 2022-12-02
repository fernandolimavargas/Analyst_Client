import React, { useEffect, useState } from 'react';

import { reqMovements } from '../../../../services/api';
import LoadingTables from '../../../loadingTables';

import './style.css';

const MovementsAnalyst = ({ idReq }) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (idReq) {
      reqMovements(idReq).then((resp) => {
        setData(resp.data);
      });
    }
  }, [idReq]);

  return (
    <div
      className="modal fade"
      id="modal-movements"
      aria-labelledby="modal-movements"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-center">Movimentações</div>
          {data == undefined ? (
            <LoadingTables />
          ) : (
            <div className="modal-body modal-movements d-flex flex-column justify-content-start">
              {data.map((item, index) => {
                return (
                  <div key={index} className="modal-movements-move">
                    <div className="d-flex justify-content-center">
                      <span className="title-mov">{item.title}</span>
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
            </div>
          )}
          <div className="modal-footer d-flex justify-content-center">
            <div className="col-4 footer-movements">
              <button type="button" className="buttons buttons-movements" data-bs-dismiss="modal">
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovementsAnalyst;
