import React, { Fragment, useEffect, useState } from 'react'

import { BiSearchAlt } from "react-icons/bi";

import LoadingTables from '../../loadingTables';
import { dataBaseList } from '../../../services/api';

import "./style.css"
import "./script.js"

const DataRegistrationTable = ({ handleInsertData }) => {

    const [dataDB, setDataDB] = useState()

    useEffect(() => {
        dataBaseList()
            .then((resp) => {
                setDataDB(resp.data)
            })
    }, [])

    return (
        <Fragment>
            <div className="input-group mb-3">
                <span className="input-group-text search-label" id="basic-addon1"><BiSearchAlt /></span>
                <input id="myInput" type="text" className="form-control search-input" placeholder="Pesquisar..." aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="div-table-registration">
                {dataDB == undefined ?
                    <LoadingTables />
                    :
                    <table id="myTable" className="table table-striped table-hover table-registration">
                        <thead>
                            <tr>
                                <th className="table-header">Cliente</th>
                                <th className="table-header">Server</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataDB.map((id, index) => (
                                <tr key={index} onClick={() => handleInsertData(id)}>
                                    <td>{id.name}</td>
                                    <td>{id.server}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </Fragment>
    );
}

export default DataRegistrationTable