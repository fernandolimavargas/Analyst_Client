import React, { Fragment, useState, useEffect } from 'react';

import { BiSearchAlt } from 'react-icons/bi';

import LoadingTables from '../../loadingTables';
import { occurrencesList } from '../../../services/api';

import './style.css';

const OccurrencesTable = ({ handleInsertData, id }) => {
  const [respOcurrences, setRespOcurrences] = useState('');
  const [search, setSearch] = useState('');

  const keys = ['ocType', 'dtaStart', 'dtaEnd'];

  useEffect(() => {
    if (id != undefined) {
      occurrencesList(id).then((resp) => {
        setRespOcurrences(resp.data);
      });
    }
  }, [id]);

  const formaterDate = (date) => {
    let dataFormat = date.split('-').reverse().join('/');
    return dataFormat;
  };

  return (
    <Fragment>
      <div className="input-group mb-3">
        <span className="input-group-text search-label" id="basic-addon1">
          <BiSearchAlt />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control search-input"
          placeholder="Pesquisar..."
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="div-table-registration">
        {!respOcurrences ? (
          <LoadingTables />
        ) : (
          <table className="table table-striped table-hover table-registration">
            <thead>
              <tr>
                <th className="table-header">Turno</th>
                <th className="table-header">Data Início</th>
                <th className="table-header">Data Fim</th>
              </tr>
            </thead>
            <tbody>
              {respOcurrences
                .filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    : keys.some((key) => item[key].toString().toLowerCase().includes(search.toLowerCase()));
                })
                .map((item) => {
                  return (
                    <tr
                      key={item.id}
                      id={item.id}
                      className="rows-table-occurrence"
                      onClick={() => handleInsertData(item)}
                    >
                      <td>{item.ocType}</td>
                      <td>{formaterDate(item.dtaStart)}</td>
                      <td>{formaterDate(item.dtaEnd)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </Fragment>
  );
};

export default OccurrencesTable;
