import React, { Fragment, useEffect, useState } from 'react'

import { BiSearchAlt } from "react-icons/bi"

import LoadingTables from '../../loadingTables'

import { analystList } from '../../../services/api'
import { errorMessage } from '../../messages'

import "./style.css"
import "./script.js"

const UserRegistrationTable = ({ handleInsertData }) => {
    const [dataAnalyst, setDataAnalyst] = useState()

    useEffect(() => {
        analystList()
            .then((resp) => {
                setDataAnalyst(resp.data)
            }).catch((err) => {
                errorMessage(err.response.data.message, "Erro")
            })
    }, [])

    return (
        <Fragment>
            <div className="input-group mb-3">
                <span className="input-group-text search-label" id="basic-addon1"><BiSearchAlt /></span>
                <input id="myInput" type="text" className="form-control search-input" placeholder="Pesquisar..." aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="div-table-registration">
                {dataAnalyst == undefined ?
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
                            {dataAnalyst.map((id, index) => (
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