import React, { Fragment, useEffect, useState } from 'react';

import { BiSearchAlt } from 'react-icons/bi';

import LoadingTables from '../../loadingTables';
import { teamsList } from '../../../services/api';

import './style.css';

const DataRegistrationTable = ({ handleInsertData }) => {
  const [dataTeam, setDataTeam] = useState();
  const [search, setSearch] = useState('');

  const keys = ['name', 'gestor', 'helper'];

  useEffect(() => {
    teamsList().then((resp) => {
      setDataTeam(resp.data);
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
        {dataTeam == undefined ? (
          <LoadingTables />
        ) : (
          <table id="myTable" className="table table-registration">
            <thead>
              <tr>
                <th className="table-header">Descrição</th>
                <th className="table-header">Gestor</th>
                <th className="table-header">Helper</th>
              </tr>
            </thead>
            <tbody>
              {dataTeam
                .filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    : keys.some((key) => item[key].toString().toLowerCase().includes(search.toLowerCase()));
                })
                .map((item, index) => (
                  <tr
                    key={index}
                    id={item.id_team}
                    className="rows-table-team"
                    onClick={() => handleInsertData(item)}
                  >
                    <td>{item.name}</td>
                    <td>{item.gestor}</td>
                    <td>{item.helper}</td>
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
