import React, { useState, Fragment, useEffect } from 'react';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { BsCircleFill } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';

import { userList } from '../../../services/api';
import { errorMessage } from '../../messages';

const createData = (name) => {
  return {
    name,
  };
};

const Row = ({ row, handleInsertData, search }) => {
  const [open, setOpen] = useState(false);
  const [dataUser, setDataUser] = useState();

  useEffect(() => {
    userList()
      .then((resp) => {
        setDataUser(resp.data);
      })
      .catch((err) => {
        try {
          errorMessage(err.response.data.message, 'Erro');
        } catch (err) {
          errorMessage('Ocorreu um erro ao carregar as informações.', 'Erro');
        }
      });
  }, []);
  return (
    <Fragment>
      {dataUser != undefined && (
        <Fragment>
          <TableRow
            component="th"
            sx={{ '& > *': { borderBottom: 'unset' }, position: 'relative' }}
          >
            <TableCell component="th" sx={{ padding: 0, margin: 0, width: 5 }}>
              <IconButton onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" sx={{ padding: 0, margin: 0, fontSize: 13 }}>
              {row.name}
            </TableCell>
            <TableCell component="th" sx={{ padding: 0, margin: 0 }}>
              <BsCalendarDate id="BsCalendarDate" onClick={() => console.log(row.name)} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ padding: 0, margin: 0 }} colSpan={2}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: 11 }}>Nome</TableCell>
                      <TableCell sx={{ fontSize: 11 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.name == 'Coordenadores' && (
                      <Fragment>
                        {dataUser
                          .filter((item) => {
                            return search.toLowerCase() === ''
                              ? item
                              : item.name.toLowerCase().includes(search.toLowerCase());
                          })
                          .map((item, index) => {
                            if (item.type == 'C') {
                              return (
                                <TableRow
                                  sx={{ cursor: 'pointer' }}
                                  key={index}
                                  id={item.id}
                                  className="rows-table-user"
                                  onClick={() => handleInsertData(item)}
                                >
                                  <TableCell sx={{ fontSize: 11 }}>{item.name}</TableCell>
                                  <TableCell sx={{ fontSize: 11 }}>
                                    {item.inactive == 'N' ? (
                                      <BsCircleFill id="circle-activate" />
                                    ) : (
                                      <BsCircleFill id="circle-inactive" />
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          })}
                      </Fragment>
                    )}
                    {row.name == 'Gestores' && (
                      <Fragment>
                        {dataUser
                          .filter((item) => {
                            return search.toLowerCase() === ''
                              ? item
                              : item.name.toLowerCase().includes(search.toLowerCase());
                          })
                          .map((item, index) => {
                            if (item.type == 'G') {
                              return (
                                <TableRow
                                  sx={{ cursor: 'pointer' }}
                                  key={index}
                                  id={item.id}
                                  className="rows-table-user"
                                  onClick={() => handleInsertData(item)}
                                >
                                  <TableCell sx={{ fontSize: 11 }}>{item.name}</TableCell>
                                  <TableCell sx={{ fontSize: 11 }}>
                                    {item.inactive == 'N' ? (
                                      <BsCircleFill id="circle-activate" />
                                    ) : (
                                      <BsCircleFill id="circle-inactive" />
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          })}
                      </Fragment>
                    )}
                    {row.name == 'Helpers' && (
                      <Fragment>
                        {dataUser
                          .filter((item) => {
                            return search.toLowerCase() === ''
                              ? item
                              : item.name.toLowerCase().includes(search.toLowerCase());
                          })
                          .map((item, index) => {
                            if (item.type == 'H') {
                              return (
                                <TableRow
                                  sx={{ cursor: 'pointer' }}
                                  key={index}
                                  id={item.id}
                                  className="rows-table-user"
                                  onClick={() => handleInsertData(item)}
                                >
                                  <TableCell sx={{ fontSize: 11 }}>{item.name}</TableCell>
                                  <TableCell sx={{ fontSize: 11 }}>
                                    {item.inactive == 'N' ? (
                                      <BsCircleFill id="circle-activate" />
                                    ) : (
                                      <BsCircleFill id="circle-inactive" />
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          })}
                      </Fragment>
                    )}
                    {row.name == 'Analistas' && (
                      <Fragment>
                        {dataUser
                          .filter((item) => {
                            return search.toLowerCase() === ''
                              ? item
                              : item.name.toLowerCase().includes(search);
                          })
                          .map((item, index) => {
                            if (item.type == 'A') {
                              return (
                                <TableRow
                                  sx={{ cursor: 'pointer' }}
                                  key={index}
                                  id={item.id}
                                  className="rows-table-user"
                                  onClick={() => handleInsertData(item)}
                                >
                                  <TableCell sx={{ fontSize: 11 }}>{item.name}</TableCell>
                                  <TableCell sx={{ fontSize: 11 }}>
                                    {item.inactive == 'N' ? (
                                      <BsCircleFill id="circle-activate" />
                                    ) : (
                                      <BsCircleFill id="circle-inactive" />
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          })}
                      </Fragment>
                    )}
                  </TableBody>
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        </Fragment>
      )}
    </Fragment>
  );
};

const rows = [
  createData('Coordenadores'),
  createData('Gestores'),
  createData('Helpers'),
  createData('Analistas'),
];

const UserRegistrationTable = ({ handleInsertData }) => {
  const [search, setSearch] = useState('');

  return (
    <Fragment>
      <div className="input-group input-box-shadow mb-3">
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
      <Paper sx={{ boxShadow: 'none' }}>
        <TableContainer className="user-registration-table">
          <Table id="myTable">
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} handleInsertData={handleInsertData} search={search} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Fragment>
  );
};

export default UserRegistrationTable;
