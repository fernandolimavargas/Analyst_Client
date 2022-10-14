import React, { Fragment, useEffect, useState } from 'react'

import { BiSearchAlt } from "react-icons/bi"

import { warningMessage, errorMessage, successMessage } from "../../../components/messages";
import LoadingTables from '../../loadingTables';

import { helperList } from '../../../services/api'

import "./style.css"
import "./script.js"

const UserRegistrationTable = ({ handleInsertData }) => {
    const [dataHelper, setDataHelper] = useState()

    useEffect(() => {
        helperList()
            .then((resp) => {
                setDataHelper(resp.data)
            }).catch((err) => {
                try {
                    warningMessage(err.response.data.message, "Aviso")
                } catch (err) {
                    errorMessage("Status Desconhecido", "Erro")
                }
            })
    }, [])

    return (
        <Fragment>
            <div className="input-group mb-3">
                <span className="input-group-text search-label" id="basic-addon1"><BiSearchAlt /></span>
                <input id="myInput" type="text" className="form-control search-input" placeholder="Pesquisar..." aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="div-table-registration">
                {dataHelper == undefined ?
                    <LoadingTables />
                    :
                    <table id="myTable" className="table table-striped table-hover table-registration">
                        <thead>
                            <tr>
                                <th className="table-header">Nome</th>
                                <th className="table-header">E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataHelper.map((id, index) => (
                                <tr key={index} onClick={() => handleInsertData(id)}>
                                    <td>{id.name}</td>
                                    <td>{id.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>

        </Fragment>
    );
}

export default UserRegistrationTable