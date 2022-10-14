import React, { Fragment, useEffect, useState } from 'react'

import { BiSearchAlt } from "react-icons/bi";

import LoadingTables from '../../loadingTables';
import { teamsList } from '../../../services/api';

import "./style.css"
import "./script.js"

const DataRegistrationTable = ({ handleInsertData }) => {
    const [dataTeam, setDataTeam] = useState()

    useEffect(() => {
        teamsList()
            .then((resp) => {
                setDataTeam(resp.data)
            })
    }, [])

    return (
        <Fragment>
            <div className="input-group mb-3">
                <span className="input-group-text search-label" id="basic-addon1"><BiSearchAlt /></span>
                <input id="myInput" type="text" className="form-control search-input" placeholder="Pesquisar..." aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="div-table-registration">
                {dataTeam == undefined ?
                    <LoadingTables />
                    :
                    <table id="myTable" className="table table-striped table-hover table-registration">
                        <thead>
                            <tr>
                                <th className="table-header">Descrição</th>
                                <th className="table-header">Gestor</th>
                                <th className="table-header">Helper</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTeam.map((id, index) => (
                                <tr key={index} onClick={() => handleInsertData(id)}>
                                    <td>{id.name}</td>
                                    <td>{id.gestor}</td>
                                    <td>{id.helper}</td>
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