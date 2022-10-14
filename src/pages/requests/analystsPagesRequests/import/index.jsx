import React, {Fragment} from 'react'

import NavBar from "../../../../components/navbar";
import Sidebar from '../../../../components/sidebar';

import '../style.css'

const AnalystRequestImport = () => {
    return (
        <Fragment>   
            <NavBar />
            <Sidebar />
            <div className="body_site row">
                <div className="row">
                    <span className="list-title">Solicitação de importação</span>
                    <hr />
                </div>
            </div>
        </Fragment>
    )
}

export default AnalystRequestImport