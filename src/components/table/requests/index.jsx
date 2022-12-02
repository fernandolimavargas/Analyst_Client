import React, { Fragment, useState, useEffect } from 'react';

import LoadingTables from '../../loadingTables';
import { BiSearchAlt } from 'react-icons/bi';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { reqErrorList } from '../../../services/api';

import './style.css';

const RequestsTable = ({ handleInsertData, isLoading }) => {
  const [data, setData] = useState();
  const [search, setSearch] = useState('');

  const keys = ['nroTP', 'issue', 'status'];

  useEffect(() => {
    reqErrorList().then((resp) => {
      setData(resp.data);
    });
  }, [isLoading]);

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
      <div className="requests-registration-table">
        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', padding: 0, margin: 0 }}>
          <TableContainer>
            {data == undefined ? (
              <LoadingTables />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ padding: 1, fontSize: 12 }}>Chamado</TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12 }}>ISSUE</TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .filter((item) => {
                      return search.toLowerCase() === ''
                        ? item
                        : keys.some((key) => item[key].toString().toLowerCase().includes(search));
                    })
                    .map((item, index) => {
                      return (
                        <TableRow
                          key={index}
                          id={item.idError}
                          className="rows-table-reqs"
                          onClick={() => handleInsertData(item)}
                        >
                          <TableCell sx={{ padding: 1, fontSize: 11 }}>{item.nroTP}</TableCell>
                          <TableCell sx={{ padding: 1, fontSize: 11 }}>
                            {item.issue == 'N' ? 'N/A' : item.issue}
                          </TableCell>
                          <TableCell sx={{ padding: 1, fontSize: 11 }}>{item.status}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Paper>
      </div>
    </Fragment>
  );
};

export default RequestsTable;
