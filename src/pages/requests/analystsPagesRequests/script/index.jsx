import React, {Fragment} from 'react'

import NavBar from "../../../../components/navbar";
import Sidebar from '../../../../components/sidebar';

import '../style.css'

const AnalystRequestScript = () => {
    return (
        <Fragment>   
            <NavBar />
            <Sidebar />
            <div className="body_site row">
                <div className="row">
                    <span className="list-title">Solicitação de compilação</span>
                    <hr />
                </div>
            </div>
        </Fragment>
    )
}

export default AnalystRequestScript