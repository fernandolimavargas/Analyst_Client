import React, { Fragment, useState, useEffect } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import LoadingTables from '../../loadingTables';
import FooterTable from '../footerTable';
import InputSearchTable from '../../inputSearchTables';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { analystQueuesInformation } from '../../../services/api';

import './style.css';

const AnalystTpsList = ({ tabListType }) => {
  const [dataTps, setDataTps] = useState();
  const [search, setSearch] = useState('');

  const type = JSON.parse(localStorage.getItem('user')).tipo;
  const keys = ['nroTp', 'analista', 'time', 'issue', 'grupo', 'resumo', 'status'];

  let countRows = 1;

  useEffect(() => {
    analystQueuesInformation().then((resp) => {
      setDataTps(resp.data);
    });
    countRows = 0;
  }, [tabListType]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', padding: 0, margin: 0 }}>
      <TableContainer sx={{ height: 445, maxHeight: 485 }}>
        {tabListType == 2 && (
          <Fragment>
            {dataTps == undefined ? (
              <Fragment>
                <ReactHTMLTableToExcel
                  className="btn-export-tables"
                  buttonText="Exportar"
                  table="table-all"
                  filename="TPS-Geral"
                  sheet="Chamados"
                />
                <InputSearchTable />
                <LoadingTables />
              </Fragment>
            ) : (
              <Fragment>
                <ReactHTMLTableToExcel
                  className="btn-export-tables"
                  buttonText="Exportar"
                  table="table-all"
                  filename="TPS-Geral"
                  sheet="Chamados"
                />
                <InputSearchTable setSearch={setSearch} />
                <Table stickyHeader id="table-all">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>#</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Chamado</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Prioridade</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Aberto</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Mov</TableCell>
                      {type != 'A' && (
                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Analista</TableCell>
                      )}
                      {type != 'A' && <TableCell sx={{ padding: 1, fontSize: 12 }}>Time</TableCell>}
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Grupo</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Resumo</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataTps
                      .filter((item) => {
                        return search.toLowerCase() === ''
                          ? item
                          : keys.some((key) => item[key].toString().toLowerCase().includes(search.toLowerCase()));
                      })
                      .map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell sx={{ padding: 1.2, fontSize: 11 }}>{countRows++}</TableCell>
                            <TableCell sx={{ padding: 1.2, fontSize: 11 }}>{item.nroTp}</TableCell>
                            <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                              {item.prioridade}
                            </TableCell>
                            <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                              {item.diasAberto}
                            </TableCell>
                            <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                              {item.dtaUltMov}
                            </TableCell>
                            {type != 'A' && (
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.analista}
                              </TableCell>
                            )}
                            {type != 'A' && (
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>{item.time}</TableCell>
                            )}
                            <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                              {item.grupo.length > 15
                                ? `${item.grupo.substring(0, 15)}...`
                                : item.grupo}
                            </TableCell>
                            <TableCell sx={{ padding: 1.2, fontSize: 11 }}>{item.resumo}</TableCell>
                            <TableCell sx={{ padding: 1.2, fontSize: 11 }}>{item.status}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                  <FooterTable />
                </Table>
              </Fragment>
            )}
          </Fragment>
        )}
        {tabListType == 3 && (
          <Fragment>
            {dataTps == undefined ? (
              <Fragment>
                <ReactHTMLTableToExcel
                  className="btn-export-tables"
                  buttonText="Exportar"
                  table="table-issue"
                  filename="TPS-Issue"
                  sheet="Chamados"
                />
                <InputSearchTable setSearch={setSearch} />
                <LoadingTables />
              </Fragment>
            ) : (
              <Fragment>
                <ReactHTMLTableToExcel
                  className="btn-export-tables"
                  buttonText="Exportar"
                  table="table-issue"
                  filename="TPS-Issue"
                  sheet="Chamados"
                />
                <InputSearchTable search={search} setSearch={setSearch} />
                <Table stickyHeader id="table-issue">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>#</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Chamado</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Issue</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Prioridade</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Aberto</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Mov</TableCell>
                      {type != 'A' && (
                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Analista</TableCell>
                      )}
                      {type != 'A' && <TableCell sx={{ padding: 1, fontSize: 12 }}>Time</TableCell>}
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Grupo</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Resumo</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataTps
                      .filter((item) => {
                        return search.toLowerCase() === ''
                          ? item
                          : keys.some((key) => item[key].toString().toLowerCase().includes(search.toLowerCase()));
                      })
                      .map((item, index) => {
                        if (item.issue != 'N' && item.issue != null) {
                          return (
                            <TableRow key={index}>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {countRows++}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.nroTp}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.issue}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.prioridade}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.diasAberto}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.dtaUltMov}
                              </TableCell>
                              {type != 'A' && (
                                <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                  {item.analista}
                                </TableCell>
                              )}
                              {type != 'A' && (
                                <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                  {item.time}
                                </TableCell>
                              )}
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.grupo.length > 15
                                  ? `${item.grupo.substring(0, 15)}...`
                                  : item.grupo}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.resumo}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.status}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                  </TableBody>
                  <FooterTable />
                </Table>
              </Fragment>
            )}
          </Fragment>
        )}
        {tabListType == 4 && (
          <Fragment>
            {dataTps == undefined ? (
              <Fragment>
                <ReactHTMLTableToExcel
                  className="btn-export-tables"
                  buttonText="Exportar"
                  table="table-15"
                  filename="TPS-Mais-15"
                  sheet="Chamados"
                />
                <InputSearchTable setSearch={setSearch} />
                <LoadingTables />
              </Fragment>
            ) : (
              <Fragment>
                <ReactHTMLTableToExcel
                  className="btn-export-tables"
                  buttonText="Exportar"
                  table="table-15"
                  filename="TPS-Mais-15"
                  sheet="Chamados"
                />
                <InputSearchTable setSearch={setSearch} />
                <Table stickyHeader id="table-15">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>#</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Chamado</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Prioridade</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Aberto</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Mov</TableCell>
                      {type != 'A' && (
                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Analista</TableCell>
                      )}
                      {type != 'A' && <TableCell sx={{ padding: 1, fontSize: 12 }}>Time</TableCell>}
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Grupo</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Resumo</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataTps
                      .filter((item) => {
                        return search.toLowerCase() === ''
                          ? item
                          : keys.some((key) => item[key].toString().toLowerCase().includes(search.toLowerCase()));
                      })
                      .map((item, index) => {
                        if (item.diasAberto >= 15) {
                          return (
                            <TableRow key={index}>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {countRows++}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.nroTp}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.prioridade}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.diasAberto}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.dtaUltMov}
                              </TableCell>
                              {type != 'A' && (
                                <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                  {item.analista}
                                </TableCell>
                              )}
                              {type != 'A' && (
                                <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                  {item.time}
                                </TableCell>
                              )}
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.grupo.length > 15
                                  ? `${item.grupo.substring(0, 15)}...`
                                  : item.grupo}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.resumo}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.status}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                  </TableBody>
                  <FooterTable />
                </Table>
              </Fragment>
            )}
          </Fragment>
        )}
        {tabListType == 5 && (
          <Fragment>
            {dataTps == undefined ? (
              <Fragment>
                <ReactHTMLTableToExcel
                  className="btn-export-tables"
                  buttonText="Exportar"
                  table="table-backlog"
                  filename="TPS-Backlog"
                  sheet="Chamados"
                />
                <InputSearchTable setSearch={setSearch} />
                <LoadingTables />
              </Fragment>
            ) : (
              <Fragment>
                <ReactHTMLTableToExcel
                  className="btn-export-tables"
                  buttonText="Exportar"
                  table="table-backlog"
                  filename="TPS-Backlog"
                  sheet="Chamados"
                />
                <InputSearchTable setSearch={setSearch} />
                <Table stickyHeader id="table-backlog">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>#</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Chamado</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Prioridade</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Aberto</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Mov</TableCell>
                      {type != 'A' && (
                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Analista</TableCell>
                      )}
                      {type != 'A' && <TableCell sx={{ padding: 1, fontSize: 12 }}>Time</TableCell>}
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Grupo</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Resumo</TableCell>
                      <TableCell sx={{ padding: 1, fontSize: 12 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataTps
                      .filter((item) => {
                        return search.toLowerCase() === ''
                          ? item
                          : keys.some((key) => item[key].toString().toLowerCase().includes(search.toLowerCase()));
                      })
                      .map((item, index) => {
                        if (item.backlog == 'S') {
                          return (
                            <TableRow key={index}>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {countRows++}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.nroTp}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.prioridade}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.diasAberto}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.dtaUltMov}
                              </TableCell>
                              {type != 'A' && (
                                <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                  {item.analista}
                                </TableCell>
                              )}
                              {type != 'A' && (
                                <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                  {item.time}
                                </TableCell>
                              )}
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.grupo.length > 15
                                  ? `${item.grupo.substring(0, 15)}...`
                                  : item.grupo}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.resumo}
                              </TableCell>
                              <TableCell sx={{ padding: 1.2, fontSize: 11 }}>
                                {item.status}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                  </TableBody>
                  <FooterTable />
                </Table>
              </Fragment>
            )}
          </Fragment>
        )}
      </TableContainer>
    </Paper>
  );
};

export default AnalystTpsList;
