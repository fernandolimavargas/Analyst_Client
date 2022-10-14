import React, { Fragment, useState, useEffect } from "react"

import LoadingTables from "../../loadingTables"

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { dataBaseList } from "../../../services/api"

import "./style.css"

const DatabaseTable = ({ tabListBases }) => {

    const [dataDB, setDataDB] = useState()

    useEffect(() => {
        dataBaseList()
            .then((resp) => {
                setDataDB(resp.data)
            })
    }, [])

    return (
        <Paper>
            <TableContainer sx={{ minHeight: 320, maxHeight: 320 }}>
                {tabListBases == 1 ?
                    <Fragment>
                        {dataDB == undefined ?
                            <LoadingTables />
                            :
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Cliente</TableCell>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Servidor</TableCell>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Instância</TableCell>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Usuário</TableCell>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Marca</TableCell>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Tamanho</TableCell>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataDB.map((item, index) => {
                                        if (item.structure == "Oracle") {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>{item.name}</TableCell>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>{item.server}</TableCell>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>{item.instance}</TableCell>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>{item.dbUser}</TableCell>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>{item.brands}</TableCell>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>{item.size}</TableCell>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>N/A</TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        }
                    </Fragment>
                    :
                    <Fragment>
                        {dataDB == undefined ?
                            <LoadingTables />
                            :
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Cliente</TableCell>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Servidor</TableCell>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Instância</TableCell>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Marca</TableCell>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Tamanho</TableCell>
                                        <TableCell sx={{ padding: 1, fontSize: 12 }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataDB.map((item, index) => {
                                        if (item.structure == "SQL Server") {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>{item.name}</TableCell>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>{item.server}</TableCell>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>{item.instance}</TableCell>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>{item.brands}</TableCell>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>{item.size}</TableCell>
                                                    <TableCell sx={{ padding: 2, fontSize: 11 }}>N/A</TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        }
                    </Fragment>}
            </TableContainer>
        </Paper>
    );
}

export default DatabaseTable