import React, { Fragment, useState, useEffect } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
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
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import LoadingTables from '../../loadingTables';
import FooterTable from '../footerTable';
import InputSearchTable from '../../inputSearchTables';

import './style.css';

import { infFilasGeraisAnalitic } from '../../../services/api';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order == 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const headCells = [
  {
    id: 'analista',
    numeric: false,
    disablePadding: true,
    label: 'Analista',
  },
  {
    id: 'time',
    numeric: false,
    disablePadding: true,
    label: 'Time',
  },
  {
    id: 'geral',
    numeric: true,
    disablePadding: true,
    label: 'Geral',
  },
  {
    id: 'issue',
    numeric: true,
    disablePadding: true,
    label: 'Issue',
  },
  {
    id: 'mais15',
    numeric: true,
    disablePadding: true,
    label: '+15 dias',
  },
  {
    id: 'backlog',
    numeric: true,
    disablePadding: true,
    label: 'Backlogs',
  },
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            sx={{ fontSize: 12 }}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy == headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy == headCell.id}
              direction={orderBy == headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy == headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order == 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ width: 30 }}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontSize: 11 }}>
          {row.analista}
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontSize: 11 }}>
          {row.time}
        </TableCell>
        <TableCell align="right" sx={{ fontSize: 11 }}>
          {row.qtdFila}
        </TableCell>
        <TableCell align="right" sx={{ fontSize: 11 }}>
          {row.qtdIssue}
        </TableCell>
        <TableCell align="right" sx={{ fontSize: 11 }}>
          {row.qtdMais}
        </TableCell>
        <TableCell align="right" sx={{ fontSize: 11 }}>
          {row.qtdBacklog}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: 11 }}>% Atingimento</TableCell>
                    <TableCell sx={{ fontSize: 11 }}>% Reabertura</TableCell>
                    <TableCell sx={{ fontSize: 11 }}>% SLA</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11 }}>
                      % Resposta
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 11 }}>
                      % NPS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontSize: 11 }}>
                      {row.ating}
                    </TableCell>
                    <TableCell component="th" scope="row" sx={{ fontSize: 11 }}>
                      {row.abert}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11 }}>{row.sla}</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11 }}>
                      {row.res}
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 11 }}>
                      {row.nps}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const ManagmentTable = () => {
  const [dataTable, setDataTable] = useState();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');

  const keys = ['analista', 'time'];

  useEffect(() => {
    infFilasGeraisAnalitic().then((resp) => {
      setDataTable(resp.data);
    });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy == property && order == 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', padding: 0, margin: 0 }}>
      <TableContainer sx={{ height: 445, maxHeight: 485 }}>
        {dataTable == undefined ? (
          <Fragment>
            <ReactHTMLTableToExcel
              className="btn-export-tables"
              buttonText="Exportar"
              table="table-analitc"
              filename="TPS-Analítico"
              sheet="Chamados"
            />
            <LoadingTables />
            <InputSearchTable setSearch={setSearch} />
          </Fragment>
        ) : (
          <Fragment>
            <ReactHTMLTableToExcel
              className="btn-export-tables"
              buttonText="Exportar"
              table="table-analitc"
              filename="TPS-Analítico"
              sheet="Chamados"
            />
            <InputSearchTable setSearch={setSearch} />
            <Table stickyHeader aria-label="collapsible table" id="table-analitc" size={'small'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={dataTable.length}
              />
              <TableBody>
                {stableSort(dataTable, getComparator(order, orderBy))
                  .filter((item) => {
                    return search.toLowerCase() === ''
                      ? item
                      : keys.some((key) => item[key].toString().toLowerCase().includes(search.toLowerCase()));
                  })
                  .map((row) => {
                    return <Row key={row.analista} row={row} />;
                  })}
              </TableBody>
              <FooterTable />
            </Table>
          </Fragment>
        )}
      </TableContainer>
    </Paper>
  );
};

export default ManagmentTable;
