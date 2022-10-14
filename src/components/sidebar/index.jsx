import React, { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom"

import { RiMenu4Line, RiSearch2Line, RiToolsLine } from "react-icons/ri"
import { AiFillCaretRight, AiOutlineLink, AiOutlinePullRequest, AiOutlineClose } from "react-icons/ai"
import { TbLayoutDashboard } from "react-icons/tb"
import { MdAppRegistration } from "react-icons/md"
import { VscDebugConsole } from "react-icons/vsc"

import { errorMessage, successMessage } from "../../components/messages"

import { createSolAlt } from "../../services/api"

import Loading from "../loading"

import "./style.css"
import iconlogo from '../../img/icon-logo.png'

const Sidebar = () => {

    const navigate = useNavigate()

    const [systemDoing, setSystemDoing] = useState("")
    const [shouldDo, setShouldDo] = useState("")
    const [note, setNote] = useState("")
    const [requestType, setRequestType] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const showToHideSubmenu = (id) => {
        let itens = document.querySelectorAll(".submenu")

        for (let item of itens) {
            if (item.parentNode.id == id) {
                item.classList.toggle("submenu-appearing")
            } else {
                item.classList.remove("submenu-appearing")
            }
        }
    }

    const sendBug = async (systemDoing, shouldDo, note, requestType) => {
        setIsLoading(true)
        const response = await createSolAlt(systemDoing, shouldDo, note, requestType)

        if (response.status == 200) {
            successMessage(response.data.message, 'Sucesso')
        } else {
            errorMessage(response.data.message, 'Erro')
        }

        navigate("/dashboard")
        setIsLoading(false)
    }

    const submitSolBug = (e) => {
        e.preventDefault()

        try {
            sendBug(systemDoing, shouldDo, note, requestType)
        } catch (err) {
            console.log(err)
        }
    }

    document.addEventListener("keyup", (e) => {
        if (e.key == "Escape") {
            let btnCloseModal = document.querySelector(".btn-close-modal-bug")
            btnCloseModal.click()
        }
    })

    return (
        <Fragment>
            <div className="sidebar">
                <div className="topside">
                    <img src={iconlogo} alt="" onClick={() => navigate("/dashboard")} />
                    <RiMenu4Line type="button" 
                        data-bs-toggle="offcanvas" 
                        data-bs-target="#menusidebar" 
                        aria-controls="menusidebar" 
                    />
                    <RiSearch2Line />
                </div>
                <div className="botside">
                    <VscDebugConsole type="button" 
                        data-bs-toggle="offcanvas" 
                        data-bs-target="#bugreport" 
                        aria-controls="bugreport" 
                    />
                    <div className="offcanvas offcanvas-start modal-div" id="bugreport">
                        {isLoading && (<Loading />)}
                        <div className="offcanvas-header bug-header">
                            <div className="d-flex justify-content-between">
                                <img src={iconlogo} alt="" />
                                <h6 className="offcanvas-title title-bug" 
                                    id="bugreportLabel">
                                    Reporte um bug ou solicite uma melhoria
                                </h6>
                            </div>
                            <a type="button" 
                                className="btn-close-modal-bug" 
                                data-bs-dismiss="offcanvas" 
                                aria-label="Close">
                                <AiOutlineClose />
                            </a>
                        </div>
                        <div className="offcanvas-body bug-body">
                            <form className="form" onSubmit={submitSolBug}>
                                <div className="mb-3">
                                    <label className="form-label" 
                                        htmlFor="systemDoing">
                                        O que o sistema está fazendo?
                                    </label>
                                    <textarea className="form-control"
                                        rows="2"
                                        value={systemDoing}
                                        onChange={(e) => setSystemDoing(e.target.value)}>
                                    </textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" 
                                        htmlFor="shouldDo">
                                        Como deveria fazer?
                                    </label>
                                    <textarea className="form-control"
                                        rows="2"
                                        value={shouldDo}
                                        onChange={(e) => setShouldDo(e.target.value)}>
                                    </textarea>
                                </div>
                                <div className="mb-5">
                                    <label className="form-label" htmlFor="note">Observação:</label>
                                    <textarea className="form-control"
                                        rows="2"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}>
                                    </textarea>
                                </div>
                                <div className="d-flex flex-row justify-content-center">
                                    <div className="mb-3 form-check me-3">
                                        <input className="form-check-input"
                                            id="improvement"
                                            name='radiocheckbug'
                                            type="radio"
                                            value="Improvement"
                                            onChange={(e) => setRequestType(e.target.value)}
                                        />
                                        <label className="form-check-label" 
                                            htmlFor="improvement">
                                            Melhoria
                                        </label>
                                    </div>
                                    <div className="mb-3 form-check me-3">
                                        <input className="form-check-input"
                                            id="correction"
                                            name='radiocheckbug'
                                            type="radio"
                                            value="Correction"
                                            onChange={(e) => setRequestType(e.target.value)}
                                        />
                                        <label className="form-check-label" 
                                            htmlFor="correction">
                                            Correção
                                        </label>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-secondary btn_send_bug mt-3" 
                                        type="submit">
                                        Enviar Solicitação
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="offcanvas offcanvas-start modal-div" 
                id="menusidebar" 
                aria-labelledby="menusidebarLabel"
            >
                <div className="offcanvas-header">
                    <div className="d-flex justify-content-between">
                        <img src={iconlogo} alt="" />
                        <h6 className="offcanvas-title ms-2" 
                            id="menusidebarLabel">
                            Linx DMS Help
                        </h6>
                    </div>
                    <AiOutlineClose type="button" 
                        className="btn-close-menu" 
                        data-bs-dismiss="offcanvas" 
                        aria-label="Close" 
                    />
                </div>
                <div className="offcanvas-body">
                    <div className="menu">
                        <li className="item" id="mn1" onClick={() => showToHideSubmenu('mn1')}>
                            <div className="item-header">
                                <AiOutlinePullRequest />
                                <a className="menulist ms-2">Solicitações</a>
                            </div>
                            <div className="submenu">
                                <a onClick={() => navigate("/request/listing/Error")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Erros
                                </a>
                                <a onClick={() => navigate("/request/listing/Alteration")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Alterações
                                </a>
                                <a onClick={() => navigate("/request/listing/Customization")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Customizações
                                </a>
                                <a onClick={() => navigate("/request/listing/Script")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Scripts
                                </a>
                                <a onClick={() => navigate("/request/listing/Service")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Serviços
                                </a>
                                <a onClick={() => navigate("/request/listing/Import")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Importações
                                </a>
                                <a onClick={() => navigate("/request/listing/Share")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Shares
                                </a>
                                <a onClick={() => navigate("/request/listing/Ticket")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Tickets
                                </a>
                                <a onClick={() =>  navigate("/request/listing/InternalIssue")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> ISSUE Internas
                                </a>
                                <a onClick={() => navigate("/request/listing/Help")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Helps
                                </a>
                            </div>
                        </li>
                        <li className="item" id="mn2" onClick={() => showToHideSubmenu('mn2')}>
                            <div className="item-header">
                                <TbLayoutDashboard />
                                <a className="menulist ms-2" >Gestão Suporte</a>
                            </div>
                            <div className="submenu">
                                <a onClick={() => navigate("/management/ServiceSearch")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Consulta de atendimentos
                                </a>
                                <a onClick={() => navigate("/management/CallSearch")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Consulta de chamados
                                </a>
                                <a onClick={() => navigate("/management/ServiceReport")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Relatorio de atendimento
                                </a>
                                <a onClick={() => navigate("/management/AnalystPerformance")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Performance de colaborador
                                </a>
                            </div>
                        </li>
                        <li className="item" id="mn3" onClick={() => showToHideSubmenu('mn3')}>
                            <div className="item-header">
                                <RiToolsLine />
                                <a className="menulist ms-2">Ferramentas</a>
                            </div>
                            <div className="submenu">
                                <a href="#"><AiFillCaretRight /> Limpeza de Arquivos Temporarios</a>
                                <a href="#"><AiFillCaretRight /> Criação/Atualização de ambiente</a>
                            </div>
                        </li>
                        <li className="item" id="mn4" onClick={() => showToHideSubmenu('mn4')}>
                            <div className="item-header">
                                <MdAppRegistration />
                                <a className="menulist ms-2">Cadastros</a>
                            </div>
                            <div className="submenu">
                                <a onClick={() => navigate("/registration/Analyst")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Analistas
                                </a>
                                <a onClick={() => navigate("/registration/Helper")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Helpers
                                </a>
                                <a onClick={() => navigate("/registration/Manager")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Gestores
                                </a>
                                <a onClick={() => navigate("/registration/Team")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Times
                                </a>
                                <a onClick={() => navigate("/registration/Database")} 
                                    data-bs-dismiss="offcanvas">
                                    <AiFillCaretRight /> Bases
                                </a>
                            </div>
                        </li>
                        <li className="item" id="mn5" onClick={() => showToHideSubmenu('mn5')}>
                            <div className="item-header">
                                <AiOutlineLink />
                                <a className="menulist ms-2">Links Externos</a>
                            </div>
                            <div className="submenu">
                                <a href="https://wf.linx.com.br/" 
                                    target="_blank">
                                    <AiFillCaretRight /> WorkFlow
                                </a>
                                <a href="https://share.linx.com.br/login.action?os_destination=%2F" 
                                    target="_blank">
                                    <AiFillCaretRight /> LinxShare
                                </a>
                                <a href="https://jira.linx.com.br/secure/Dashboard.jspa" 
                                    target="_blank">
                                    <AiFillCaretRight /> JiraLinx
                                </a>
                                <a href="http://apollo-app03.eastus.cloudapp.azure.com:81/" 
                                    target="_blank">
                                    <AiFillCaretRight /> Dicionario
                                </a>
                                <a href="https://share.linx.com.br/pages/viewpage.action?pageId=304502307" 
                                    target="_blank">
                                    <AiFillCaretRight /> DVI-Share
                                </a>
                                <a href="http://linxnfse.linx.com.br/portalcross/login.xhtml" 
                                    target="_blank">
                                    <AiFillCaretRight /> Portal Cross
                                </a>
                                <a href="http://192.168.45.4:8080/interact_multiagent/" 
                                    target="_blank">
                                    <AiFillCaretRight /> Interact Multiagent
                                </a>
                                <a href="https://suporte.ccmtecnologia.com.br/portal/pt/signin" 
                                    target="_blank">
                                    <AiFillCaretRight /> CCM
                                </a>
                                <a href="http://192.168.45.4:8080/interact_manager/" 
                                    target="_blank">
                                    <AiFillCaretRight /> Interact Manager
                                </a>
                                <a href="https://linx.deskbee.app/app/home" 
                                    target="_blank">
                                    <AiFillCaretRight /> Workspace
                                </a>
                            </div>
                        </li>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default Sidebar;