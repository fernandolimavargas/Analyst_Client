import React, { useState, useEffect, Fragment } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';

import { analystQueuesInformationFooter } from '../../../services/api';

const FooterTable = () => {
  const [dataFooterTps, setDataFooterTps] = useState();

  useEffect(() => {
    analystQueuesInformationFooter().then((resp) => {
      setDataFooterTps(resp.data);
    });
  }, []);
  return (
    <Fragment>
      {dataFooterTps && (
        <TableFooter className="stickyFooter">
          {dataFooterTps.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="cellFooter" sx={{ fontSize: 12 }}>
                Chamados Abertos: {item.qtdFila}
              </TableCell>
              <TableCell className="cellFooter" sx={{ fontSize: 12 }}>
                Chamados com issue: {item.qtdIssue}
              </TableCell>
              <TableCell className="cellFooter" sx={{ fontSize: 12 }}>
                +15 dias: {item.qtdMais}
              </TableCell>
              <TableCell className="cellFooter" sx={{ fontSize: 12 }}>
                Backlogs: {item.qtdBacklog}
              </TableCell>
            </TableRow>
          ))}
        </TableFooter>
      )}
    </Fragment>
  );
};

export default FooterTable;
