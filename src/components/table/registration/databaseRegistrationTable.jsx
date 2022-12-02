import React, { Fragment, useEffect, useState } from 'react';

import { BiSearchAlt } from 'react-icons/bi';

import LoadingTables from '../../loadingTables';
import { dataBaseList } from '../../../services/api';

import './style.css';

const DataRegistrationTable = ({ handleInsertData }) => {
  const [dataDB, setDataDB] = useState();
  const [search, setSearch] = useState('');

  const keys = ['name', 'server'];

  useEffect(() => {
    dataBaseList().then((resp) => {
      setDataDB(resp.data);
    });
  }, []);

  return (
    <Fragment>
      <div className="input-group mb-3">
        <span className="input-group-text search-label" id="basic-addon1">
          <BiSearchAlt />
        </span>
        <input
          id="myInput"
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
        {dataDB == undefined ? (
          <LoadingTables />
        ) : (
          <table id="myTable" className="table table-registration">
            <thead>
              <tr>
                <th className="table-header">Cliente</th>
                <th className="table-header">Server</th>
              </tr>
            </thead>
            <tbody>
              {dataDB
                .filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    : keys.some((key) => item[key].toString().toLowerCase().includes(search.toLowerCase()));
                })
                .map((item) => (
                  <tr
                    key={item.id}
                    id={item.id}
                    className="rows-table-db"
                    onClick={() => handleInsertData(item)}
                  >
                    <td>{item.name}</td>
                    <td>{item.server}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </Fragment>
  );
};

export default DataRegistrationTable;
