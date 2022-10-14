import React, {Fragment, useState} from 'react'

import NavBar from "../../../../components/navbar";
import Sidebar from '../../../../components/sidebar';
import { BiPlusMedical } from "react-icons/bi";
import {ErrorRequestTable} from '../../../../components/table/request/errorRequestTable';


import '../style.css'

const AnalystRequestError = () => {
    const [tpNumber, setTpNumber] = useState()
    const [menuWay, setMenuWay] = useState()
    const [menuCode, setMenuCode] = useState()
    const [systemDoing, setSystemDoing] = useState()
    const [systemMustDo, setSystemMustDo] = useState()
    const [palliative, setPalliative] = useState()
    const [database, setDatabase] = useState()
    const [version, setVersion] = useState()
    const [lastVersion, setLastVersion] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()

    const handleInserData = (data) => {
        setTpNumber(data.tpNumber)
        setMenuWay(data.menuWay)
        setMenuCode(data.menuCode)
        setSystemDoing(data.systemDoing)
        setSystemMustDo(data.systemMustDo)
        setPalliative(data.palliative)
        setDatabase(data.setDatabase)
        setVersion(data.version)
        setLastVersion(data.version)
    }


    }
    return (
        <Fragment>   
            <NavBar />
            <Sidebar />
            <div className="body_site row">
                <div className="row">
                    <span className="list-title">Solicitação de analise de bug</span>
                    <hr />
                </div>
                <div className='row'>
                    <div className="col-3">
                        <div className="col-12">
                            <ErrorRequestTable />
                        </div>
                    </div>
                    <div className="registration col-9">
                        <div className="col-12">
                            <div className="row">
                                <div className="reg-form col-9">
                                    <form onSubmit={handleSubmit}>
                                        <div className="col-3">
                                            <div className="form-group form-group-error mb-4">
                                                <input 
                                                id = "tpNumber"
                                                type="text" 
                                                value={tpNumber}
                                                placeholder="name"
                                                onChange={(e) => setTpNumber(e.target.value)}
                                                className="form-control form-control-sm form-input" />
                                                <label className="form-label form-label-error">Número da TP</label>                        
                                            </div> 
                                        </div>
                                        <div className='row'> 
                                            <div className="col-9">
                                                <div className="form-group form-group-error mb-4">
                                                    <input
                                                        id = "menuWay"
                                                        type="text"
                                                        value={menuWay}
                                                        placeholder="menuWay"
                                                        onChange={(e) => setMenuWay(e.target.value)}
                                                        className="form-control form-control-sm form-input" />
                                                    <label className="form-label form-label-error">Caminho do Menu</label>
                                                </div>
                                            </div>
                                            <div className='col-3'>
                                                <div className="form-group form-group-error mb-4">
                                                    <input
                                                        id = "menuCode"
                                                        type="number"
                                                        value={menuCode}
                                                        placeholder="menuCode"
                                                        onChange={(e) => setMenuCode(e.target.value)}
                                                        className="form-control form-control-sm form-input" />
                                                    <label className="form-label form-label-error">Código do Menu</label>
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group form-group-error mb-4">
                                                <textarea 
                                                id = "systemDoing"
                                                type="text" 
                                                value={systemDoing}
                                                placeholder="systenDoing"
                                                onChange={(e) => setSystemDoing(e.target.value)}
                                                className="form-control form-control-sm form-input" />
                                                <label className="form-label form-label-error">O que o sistema está fazendo?</label>        
                                            </div>               
                                        </div> 
                                        <div className="col-12">
                                            <div className="form-group form-group-error mb-4">
                                                <textarea 
                                                id = "systemDoing"
                                                type="text" 
                                                value={systemMustDo}
                                                placeholder="systemMustDo"
                                                onChange={(e) => setSystemMustDo(e.target.value)}
                                                className="form-control form-control-sm form-input" />
                                                <label className="form-label form-label-error">O que o sistema deveria fazer?</label>        
                                            </div>               
                                        </div> 
                                        <div className="col-12">
                                            <div className="form-group form-group-error mb-4">
                                                <textarea 
                                                id = "palliative"
                                                type="text" 
                                                value={palliative}
                                                placeholder="palliative"
                                                onChange={(e) => setPalliative(e.target.value)}
                                                className="form-control form-control-sm form-input" />
                                                <label className="form-label form-label-error">Paliativa</label>        
                                            </div>               
                                        </div>
                                        <div className='row'>
                                            <div className="col-6">
                                                <div className="form-group form-group-error mb-4">
                                                    <input 
                                                    id = "database"
                                                    type="text" 
                                                    value={database}
                                                    placeholder="name"
                                                    onChange={(e) => setDatabase(e.target.value)}
                                                    className="form-control form-control-sm form-input" />
                                                    <label className="form-label form-label-error">Banco de Dados</label>                        
                                                </div> 
                                            </div>
                                            <div className="col-3">
                                                <div className="form-group form-group-error mb-4">
                                                    <select 
                                                    id = "version"
                                                    type="text" 
                                                    value={version}
                                                    placeholder="name"
                                                    onChange={(e) => setVersion(e.target.value)}
                                                    className="form-control form-control-sm form-input">
                                                        <option value="0">Selecione a Versão</option>
                                                            <option value="5.07">5.07</option>
                                                            <option value="5.08">5.08</option>
                                                            <option value="5.09">5.09</option>
                                                    </select>

                                                    <label className="form-label form-label-error">Versão</label>    
                                                </div> 
                                            </div>
                                            <div className="col-3">
                                                <div className="form-group form-group-error mb-4">
                                                    <select 
                                                    id = "lastVersion"
                                                    type="text" 
                                                    value={lastVersion}
                                                    placeholder="name"
                                                    onChange={(e) => setLastVersion(e.target.value)}
                                                    className="form-control form-control-sm form-input" >
                                                        <option value="0">Versão Passada</option>
                                                            <option value="sim">Sim</option>
                                                            <option value="nao">Não</option>
                                                    </select>
                                                    <label className="form-label form-label-error">Anterior</label>    
                                                </div> 
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-3">
                                    <button
                                            id="btn-insert"
                                            className="buttons"
                                            onClick={() => handleSubmit("btn-insert")}>
                                            <BiPlusMedical className="icon-button" />
                                            Inserir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AnalystRequestError