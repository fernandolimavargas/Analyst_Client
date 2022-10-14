import React, { Fragment, useState, useEffect } from "react"
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TableSortLabel from '@mui/material/TableSortLabel'
import TableFooter from '@mui/material/TableFooter'
import { visuallyHidden } from '@mui/utils'

import LoadingTables from "../../loadingTables"

import "./style.css"

import { infFilasGeraisAnalitic } from "../../../services/api"

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) => {
  return order == 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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
}


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
  const { order, orderBy, onRequestSort } =
    props;
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
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ width: 30 }} >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
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
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: 11 }}>% Atingimento</TableCell>
                    <TableCell sx={{ fontSize: 11 }}>% Reabertura</TableCell>
                    <TableCell sx={{ fontSize: 11 }}>% SLA</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11 }}>% Resposta</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11 }}>% NPS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow >
                    <TableCell component="th" scope="row" sx={{ fontSize: 11 }}>
                      {row.ating}
                    </TableCell>
                    <TableCell component="th" scope="row" sx={{ fontSize: 11 }}>
                      {row.abert}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11 }}>
                      {row.sla}
                    </TableCell>
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
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    analista: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    qtdFila: PropTypes.number.isRequired,
    qtdIssue: PropTypes.number.isRequired,
    qtdMais: PropTypes.number.isRequired,
    qtdBacklog: PropTypes.number.isRequired,
    ating: PropTypes.string.isRequired,
    abert: PropTypes.string.isRequired,
    sla: PropTypes.string.isRequired,
    res: PropTypes.string.isRequired,
    nps: PropTypes.string.isRequired,
  }).isRequired,
};


const ManagmentTable = (props) => {
  const [dataTable, setDataTable] = useState()
  const [qtdFilaTot, setQtdFilaTot] = useState("")
  const [qtdIssueTot, setQtdIssueTot] = useState("")
  const [qtdMaisTot, setQtdMaisTot] = useState("")
  const [qtdBacklogTot, setQtdBacklogTot] = useState("")
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);

  useEffect(() => {
    infFilasGeraisAnalitic()
      .then((resp) => {
        setDataTable(resp.data)

        let qtdFilaAux = 0
        let qtdIssueAux = 0
        let qtdMaisAux = 0
        let qtdBacklogAux = 0

        for (let i in resp.data) {
          qtdFilaAux += resp.data[i].qtdFila
          qtdIssueAux += resp.data[i].qtdIssue
          qtdMaisAux += resp.data[i].qtdMais
          qtdBacklogAux += resp.data[i].qtdBacklog
        }

        setQtdFilaTot(qtdFilaAux)
        setQtdIssueTot(qtdIssueAux)
        setQtdMaisTot(qtdMaisAux)
        setQtdBacklogTot(qtdBacklogAux)
      })
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy == property && order == 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', padding: 0, margin: 0 }}>
      <TableContainer sx={{ maxHeight: 320 }}>
        {dataTable == undefined ?
          <LoadingTables />
          :
          <Fragment>
            <Table stickyHeader aria-label="collapsible table" size={'small'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={dataTable.length}
              />
              <TableBody>
                {stableSort(dataTable, getComparator(order, orderBy)).map((row) => {
                  return (
                    <Row key={row.analista} row={row} />
                  )
                })}
              </TableBody>
              <TableFooter className="stickyFooter">
                <TableRow>
                  <TableCell className="cellFooter" sx={{ fontSize: 12 }}>Chamados Abertos: {qtdFilaTot}</TableCell>
                  <TableCell className="cellFooter" sx={{ fontSize: 12 }}>Chamados com issue: {qtdIssueTot}</TableCell>
                  <TableCell className="cellFooter" sx={{ fontSize: 12 }}>+15 dias: {qtdMaisTot}</TableCell>
                  <TableCell className="cellFooter" sx={{ fontSize: 12 }}>Backlogs: {qtdBacklogTot}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Fragment>}
      </TableContainer>
    </Paper>
  );
}

export default ManagmentTable