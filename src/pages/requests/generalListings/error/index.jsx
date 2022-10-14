import React, {Fragment} from 'react'

import NavBar from "../../../../components/navbar";
import Sidebar from '../../../../components/sidebar';

import '../style.css'

const GeneralListingError = () => {
    return (
        <Fragment>   
            <NavBar />
            <Sidebar />
            <div className="body_site row">
                <div className="row">
                    <span className="list-title">Listagem de Erros</span>
                    <hr />
                </div>
            </div>
        </Fragment>
    )
}

export default GeneralListingError