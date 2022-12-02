import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingTables from '../../loadingTables';
import GlobalContext from '../../../contexts/global';

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

const ListingHelpers = ({ typeSol }) => {
  const navigate = useNavigate();
  const { setRequest } = useContext(GlobalContext);

  const [data, setData] = useState();
  const [search, setSearch] = useState('');

  const keys = ['nroTP', 'analyst', 'issue', 'make', 'status'];

  const selectedRequest = (data) => {
    localStorage.setItem('IdReq', data.idError);
    setRequest(data.idError);
    navigate('/request/helper/error/publish');
  };

  useEffect(() => {
    reqErrorList().then((resp) => {
      setData(resp.data);
      console.log(resp.data);
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
      <div className="table-listing-helpers">
        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', padding: 0, margin: 0 }}>
          <TableContainer>
            {data == undefined ? (
              <LoadingTables />
            ) : (
              <Table>
                {typeSol == 'error' && (
                  <Fragment>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Chamado</TableCell>
                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Analista</TableCell>
                        <TableCell sx={{ padding: 1, fontSize: 12 }}>ISSUE</TableCell>
                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Situação</TableCell>
                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Criação</TableCell>
                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Finalização</TableCell>
                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data
                        .filter((item) => {
                          return search.toLowerCase() === ''
                            ? item
                            : keys.some((key) =>
                                item[key].toString().toLowerCase().includes(search)
                              );
                        })
                        .map((item, index) => {
                          return (
                            <TableRow
                              className="row-table-listing"
                              key={index}
                              onClick={() => selectedRequest(item)}
                            >
                              <TableCell sx={{ padding: 1, fontSize: 11 }}>{item.nroTP}</TableCell>
                              <TableCell sx={{ padding: 1, fontSize: 11 }}>
                                {item.analyst}
                              </TableCell>
                              <TableCell sx={{ padding: 1, fontSize: 11 }}>
                                {item.issue == 'N' ? 'N/A' : item.issue}
                              </TableCell>
                              <TableCell sx={{ padding: 1, fontSize: 11 }}>
                                {`${item.making.substring(0, 100)}...`}
                              </TableCell>
                              <TableCell sx={{ padding: 1, fontSize: 11 }}>
                                {item.dtaCreate}
                              </TableCell>
                              <TableCell sx={{ padding: 1, fontSize: 11 }}>
                                {item.dtaConcluded}
                              </TableCell>
                              <TableCell sx={{ padding: 1, fontSize: 11 }}>{item.status}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Fragment>
                )}
              </Table>
            )}
          </TableContainer>
        </Paper>
      </div>
    </Fragment>
  );
};

export default ListingHelpers;
