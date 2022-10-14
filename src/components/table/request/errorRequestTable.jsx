import React, {Fragment, useState, useEffect} from "react"
import { BiSearchAlt } from "react-icons/bi"
import {analystRequestErrorList} from "../../../services/api"



export const ErrorRequestTable = ( {InsertData} ) => {
    const [dataRequestError, setDataRequestError] = useState()

    useEffect(() => {
        analystRequestErrorList()
        .then((resp) => {
            setDataRequestError(resp.data)
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
                <table id="myTable" className="table table-striped table-hover table-registration">
                    <thead>
                        <tr>
                            <th className="table-header">TP</th>
                            <th className="table-header">ISSUE</th>
                            <th className="table-header">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}
