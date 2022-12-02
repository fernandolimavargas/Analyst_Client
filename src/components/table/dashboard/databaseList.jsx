import React, { Fragment, useState, useEffect } from 'react';
import LoadingTables from '../../loadingTables';

import { FiCopy } from 'react-icons/fi';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { dataBaseList } from '../../../services/api';

import './style.css';
import { textAlign } from '@mui/system';

const DatabaseTable = ({ tabListBases }) => {
  const [dataDB, setDataDB] = useState();
  const [dropdownDatabase, setDropdownDatabase] = useState(false);
  const [dataConnection, setDataConnection] = useState();

  useEffect(() => {
    dataBaseList().then((resp) => {
      setDataDB(resp.data);
    });
  }, []);

  const handleConnection = (data) => {
    setDropdownDatabase(!dropdownDatabase);
    setDataConnection(data);
    console.log(data);
  };

  return (
    <Paper sx={{ boxShadow: 'none' }}>
      <TableContainer sx={{ minHeight: 407.5, maxHeight: 407.5 }}>
        {dropdownDatabase && (
          <div className="modal-database d-flex align-content-around flex-column">
            <div className="title-database">
              <span>Conexão</span>
            </div>
            <div>
              {dataConnection.structure == 'Oracle' ? (
                <p>
                  [BANCODADOS]={dataConnection.structure.toUpperCase()} <br />
                  [USUARIO_ORACLE]={dataConnection.dbUser} <br />
                  [DATABASE]={dataConnection.server}/{dataConnection.instance}
                </p>
              ) : (
                <p>
                  [BANCODADOS]={dataConnection.structure.replace(' ', '').toUpperCase()} <br />
                  [DATABASE]={dataConnection.server}:{dataConnection.instance}
                </p>
              )}
            </div>
          </div>
        )}
        {tabListBases == 1 ? (
          <Fragment>
            {dataDB == undefined ? (
              <LoadingTables />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Cliente
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Servidor
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Instância
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Usuário
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Marca
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Tamanho
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Conexão
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataDB.map((item, index) => {
                    if (item.structure == 'Oracle') {
                      return (
                        <TableRow key={index}>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.name}
                          </TableCell>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.server}
                          </TableCell>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.instance}
                          </TableCell>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.dbUser}
                          </TableCell>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.brands}
                          </TableCell>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.size}
                          </TableCell>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.status}
                          </TableCell>
                          <TableCell sx={{ padding: 0, fontSize: 18, textAlign: 'center' }}>
                            <FiCopy onClick={() => handleConnection(item)} />
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            )}
          </Fragment>
        ) : (
          <Fragment>
            {dataDB == undefined ? (
              <LoadingTables />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Cliente
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Servidor
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Instância
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Marca
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Tamanho
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ padding: 1, fontSize: 12, textAlign: 'center' }}>
                      Conexão
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataDB.map((item, index) => {
                    if (item.structure == 'SQL Server') {
                      return (
                        <TableRow key={index}>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.name}
                          </TableCell>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.server}
                          </TableCell>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.instance}
                          </TableCell>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.brands}
                          </TableCell>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.size}
                          </TableCell>
                          <TableCell sx={{ padding: 2, fontSize: 11, textAlign: 'center' }}>
                            {item.status}
                          </TableCell>
                          <TableCell sx={{ padding: 0, fontSize: 18, textAlign: 'center' }}>
                            <FiCopy onClick={() => handleConnection(item)} />
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            )}
          </Fragment>
        )}
      </TableContainer>
    </Paper>
  );
};

export default DatabaseTable;
