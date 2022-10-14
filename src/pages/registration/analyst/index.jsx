import React, { Fragment, useState, useEffect } from "react"

import { BsCheckLg } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import UserRegistrationTable from "../../../components/table/registration/analystRegistrationTable";
import { warningMessage, successMessage, errorMessage } from "../../../components/messages";

import Loading from "../../../components/loading";

import NavBar from "../../../components/navbar";
import Sidebar from '../../../components/sidebar';

import { analystEdit, analystDelete, analystRegistration, teamsList } from '../../../services/api';

import "../style.css"

const RegistrationAnalyst = () => {

    const [analystID, setAnalystID] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [office, setOffice] = useState("")
    const [goal, setGoal] = useState("")
    const [team, setTeam] = useState("")
    const [dataTeam, setDataTeam] = useState()

    const [isLoading, setIsLoading] = useState(false)

    const handleInsertData = (data) => {
        setAnalystID(data.id)
        setName(data.name)
        setEmail(data.email)
        setOffice(data.office)
        setGoal(data.goal)
        setTeam(data.team)

        setPassword("")
        setConfirmPassword("")
    }

    const clearInputs = () => {
        setAnalystID("")
        setName("")
        setEmail("")
        setOffice("")
        setGoal("")
        setTeam("")
        setPassword("")
        setConfirmPassword("")       
    }

    const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#\%!-])[0-9a-zA-Z$*&@#\%!-]/
    const regEmail = /^[a-z]+\.[a-z]+@linx+\.com+\.br/

    const regGoal = new RegExp('^[0-9]+$')

    const handleSubmit = (idButton) => {
        switch (idButton) {
            case "btn-save":
                if (!name || !email || !password || !confirmPassword || office == 0 || !goal || !team) {
                    warningMessage("Preencha os campos antes de salvar", "Aviso")
                } else if (!regEmail.exec(email)) {
                    warningMessage('E-mail inválido. Utilize: "seuusuario@linx.com.br"')
                } else if (!regPass.exec(password) || password.length < 8) {
                    warningMessage("A senha não atende aos critérios de segurança", "Aviso")
                } else if (password !== confirmPassword){
                    warningMessage("As senhas não conferem", "Aviso")
                } else if (!regGoal.exec(goal)) {
                    warningMessage('Só é permitido números no campo "Meta"', "Aviso")
                } else {
                    handleAnalystEdit(analystID, name, email, password, office, goal, team)
                }
                break
            case "btn-insert":
                if (!name || !email || !password || !confirmPassword || office == 0 || !goal || !team) {
                    warningMessage("Preencha os campos antes de salvar", "Aviso")
                } else if (!regEmail.exec(email)) {
                    warningMessage('E-mail inválido. Utilize: "seuusuario@linx.com.br"')
                } else if (!regPass.exec(password) || password.length < 8) {
                    warningMessage("A senha não atende aos critérios de segurança", "Aviso")
                } else if (password !== confirmPassword){
                    warningMessage("As senhas não conferem", "Aviso")
                } else if (!regGoal.exec(goal)) {
                    warningMessage('Só é permitido números no campo "Meta"', "Aviso")
                } else {
                    handleAnalystRegistration(name, email, password, office, goal, team)
                }
                break
            case "btn-cancel":
                window.location.reload()
                break
            case "btn-delete":
                handleAnalystDelete(analystID)
                break
            case "btn-occurrences":
                //function occurrences
                break
        }
    }

    const handleAnalystEdit = async (analystID, name, email, password, office, goal, team) => {
        setIsLoading(true)
        await analystEdit(analystID, name, email, password, office, goal, team)
            .then((resp) => {
                successMessage(resp.data.message, "Sucesso")
                clearInputs()
            }).catch((err) => {
                try {
                    warningMessage(err.response.data.message, "Aviso")
                } catch (err) {
                    errorMessage("Status Desconhecido.", "Erro")
                }
            })
        setIsLoading(false)
    }

    const handleAnalystRegistration = async (name, email, password, office, goal, team) => {
        setIsLoading(true)
        await analystRegistration(name, email, password, office, goal, team)
            .then((resp) => {
                successMessage(resp.data.message, "Sucesso")
                clearInputs()
            }).catch((err) => {
                try {
                    warningMessage(err.response.data.message, "Aviso")
                } catch (err) {
                    errorMessage("Status Desconhecido.", "Erro")
                }
            })
        setIsLoading(false)
    }

    const handleAnalystDelete = async (analystID) => {
        setIsLoading(true)
        await analystDelete(analystID)
            .then((resp) => {
                successMessage(resp.data.message, "Sucesso")
                clearInputs()
            }).catch((err) => {
                try {
                    warningMessage(err.response.data.message, "Aviso")
                } catch (err) {
                    errorMessage("Status Desconhecido.", "Erro")
                }
            })
        setIsLoading(false)
    }

    useEffect(() => {
        teamsList()
            .then((resp) => {
                setDataTeam(resp.data)
            }).catch((err) => {
                errorMessage(err.response.data.message, "Erro")
            })
            
    }, [])

    return (
        <Fragment>
            <NavBar />
            <Sidebar />
            {isLoading ?
                <Fragment>
                    <div className="body_site row">
                        <Loading />
                        <div className="row">
                            <span className="reg-title">Manutenção de Analistas</span>
                            <hr />
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <div className="col-12">
                                    <UserRegistrationTable handleInsertData={handleInsertData} />
                                </div>
                            </div>
                            <div className="registration col-9">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="reg-form col-9">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group form-group-registration mb-4">
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="name"
                                                        className="form-control form-control-sm form-input" />
                                                    <label className="form-label form-label-registration">Nome</label>
                                                    <div className="invalid-feedback">
                                                        <p>
                                                            Campo Obrigatório.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-registration mb-4">
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="email"
                                                        className="form-control form-control-sm form-input" />
                                                    <label className="form-label form-label-registration">E-Mail</label>
                                                    <div className="invalid-feedback">
                                                        <p>
                                                            Campo Obrigatório.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="row mb-4 input-pass-roles">
                                                    <div className="col-6">
                                                        <div className="col-12 mb-4">
                                                            <div className="form-group form-group-registration">
                                                                <input
                                                                    id="password"
                                                                    type="password"
                                                                    value={password}
                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                    placeholder="password"
                                                                    className="form-control form-control-sm form-input" />
                                                                <label className="form-label form-label-registration">Senha</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group form-group-registration">
                                                                <input
                                                                    id="confirmPassword"
                                                                    type="password"
                                                                    value={confirmPassword}
                                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                                    placeholder="confirmPassword"
                                                                    className="form-control form-control-sm form-input" />
                                                                <label className="form-label form-label-registration">Confirmação de Senha</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="col-12 roles-password">
                                                            <fieldset className="border field-roles">
                                                                <legend className="float-none w-auto">A senha deve conter</legend>
                                                                <ul>
                                                                    <li>Pelo menos 8 caracteres.</li>
                                                                    <li>1 letra maiuscula e minuscula.</li>
                                                                    <li>1 caracter especial.</li>
                                                                    <li>1 número.</li>
                                                                </ul>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col-5">
                                                        <div className="form-group form-group-registration">
                                                            <select
                                                                id="office"
                                                                value={office}
                                                                onChange={(e) => setOffice(e.target.value)}
                                                                placeholder="office"
                                                                className="form-select form-select-sm">
                                                                <option value="0">Selecione o Cargo</option>
                                                                <option value="Analista Jr I">Analista Jr I</option>
                                                                <option value="Analista Jr II">Analista Jr II</option>
                                                                <option value="Analista Pl I">Analista Pl I</option>
                                                                <option value="Analista Pl II">Analista Pl II</option>
                                                                <option value="Analista Pl I">Analista Sr I</option>
                                                                <option value="Analista Pl I">Analista Sr II</option>
                                                            </select>
                                                            <label className="form-label form-label-registration">Cargo</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="form-group form-group-registration">
                                                            <input
                                                                id="goal"
                                                                value={goal}
                                                                onChange={(e) => setGoal(e.target.value)}
                                                                type="text"
                                                                placeholder="goal"
                                                                className="form-control form-control-sm form-input" />
                                                            <label className="form-label form-label-registration">Meta</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-5">
                                                        <div className="form-group form-group-registration">
                                                            <select
                                                                id="team"
                                                                value={team}
                                                                onChange={(e) => setTeam(e.target.value)}
                                                                placeholder="team"
                                                                className="form-select form-select-sm">
                                                                <option value="0">Selecione o Time</option>
                                                                {dataTeam !== undefined && 
                                                                    dataTeam.map((id, index) => (
                                                                        <option
                                                                            key={index}
                                                                            value={id.id_team}>
                                                                                {id.name}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <label className="form-label form-label-registration">Time</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-3">
                                            <button
                                                id="btn-save"
                                                className="buttons"
                                                onClick={() => handleSubmit("btn-save")}>
                                                <BsCheckLg className="icon-button" />
                                                Salvar
                                            </button>
                                            <button
                                                id="btn-insert"
                                                className="buttons"
                                                onClick={() => handleSubmit("btn-insert")}>
                                                <BiPlusMedical className="icon-button" />
                                                Inserir
                                            </button>
                                            <button
                                                id="btn-cancel"
                                                className="buttons"
                                                onClick={() => handleSubmit("btn-cancel")}>
                                                <MdOutlineCancel className="icon-button" />
                                                Cancelar
                                            </button>
                                            <button
                                                id="btn-delete"
                                                className="buttons"
                                                onClick={() => handleSubmit("btn-delete")}>
                                                <RiDeleteBin5Line className="icon-button" />
                                                Excluir
                                            </button>
                                            <button
                                                id="btn-occurrences"
                                                className="buttons"
                                                onClick={() => handleSubmit("btn-occurrences")}>
                                                <BsCalendarDate className="icon-button" />
                                                Ocorrências
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
                :
                <Fragment>
                    <div className="body_site row">
                        <div className="row">
                            <span className="reg-title">Manutenção de Analistas</span>
                            <hr />
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <div className="col-12">
                                    <UserRegistrationTable handleInsertData={handleInsertData} />
                                </div>
                            </div>
                            <div className="registration col-9">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="reg-form col-9">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group form-group-registration mb-4">
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="name"
                                                        className="form-control form-control-sm form-input" />
                                                    <label className="form-label form-label-registration">Nome</label>
                                                    <div className="invalid-feedback">
                                                        <p>
                                                            Campo Obrigatório.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-registration mb-4">
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="email"
                                                        className="form-control form-control-sm form-input" />
                                                    <label className="form-label form-label-registration">E-Mail</label>
                                                    <div className="invalid-feedback">
                                                        <p>
                                                            Campo Obrigatório.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="row mb-4 input-pass-roles">
                                                    <div className="col-6">
                                                        <div className="col-12 mb-4">
                                                            <div className="form-group form-group-registration">
                                                                <input
                                                                    id="password"
                                                                    type="password"
                                                                    value={password}
                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                    placeholder="password"
                                                                    className="form-control form-control-sm form-input" />
                                                                <label className="form-label form-label-registration">Senha</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group form-group-registration">
                                                                <input
                                                                    id="confirmPassword"
                                                                    type="password"
                                                                    value={confirmPassword}
                                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                                    placeholder="confirmPassword"
                                                                    className="form-control form-control-sm form-input" />
                                                                <label className="form-label form-label-registration">Confirmação de Senha</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="col-12 roles-password">
                                                            <fieldset className="border field-roles">
                                                                <legend className="float-none w-auto">A senha deve conter</legend>
                                                                <ul>
                                                                    <li>Pelo menos 8 caracteres.</li>
                                                                    <li>1 letra maiuscula e minuscula.</li>
                                                                    <li>1 caracter especial.</li>
                                                                    <li>1 número.</li>
                                                                </ul>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col-5">
                                                        <div className="form-group form-group-registration">
                                                            <select
                                                                id="office"
                                                                value={office}
                                                                onChange={(e) => setOffice(e.target.value)}
                                                                placeholder="office"
                                                                className="form-select form-select-sm">
                                                                <option value="0">Selecione o Cargo</option>
                                                                <option value="Analista Jr I">Analista Jr I</option>
                                                                <option value="Analista Jr II">Analista Jr II</option>
                                                                <option value="Analista Pl I">Analista Pl I</option>
                                                                <option value="Analista Pl II">Analista Pl II</option>
                                                                <option value="Analista Pl I">Analista Sr I</option>
                                                                <option value="Analista Pl I">Analista Sr II</option>
                                                            </select>
                                                            <label className="form-label form-label-registration">Cargo</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="form-group form-group-registration">
                                                            <input
                                                                id="goal"
                                                                value={goal}
                                                                onChange={(e) => setGoal(e.target.value)}
                                                                type="text"
                                                                maxLength={2}
                                                                placeholder="goal"
                                                                className="form-control form-control-sm form-input" />
                                                            <label className="form-label form-label-registration">Meta</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-5">
                                                        <div className="form-group form-group-registration">
                                                            <select
                                                                id="team"
                                                                value={team}
                                                                onChange={(e) => setTeam(e.target.value)}
                                                                placeholder="team"
                                                                className="form-select form-select-sm">
                                                                <option value="0">Selecione o Time</option>
                                                                {dataTeam !== undefined && 
                                                                    dataTeam.map((id, index) => (
                                                                        <option
                                                                            key={index}
                                                                            value={id.id_team}>
                                                                                {id.name}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <label className="form-label form-label-registration">Time</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-3">
                                            {!analystID ?
                                                <button
                                                    id="btn-save"
                                                    className="buttons"
                                                    disabled>
                                                        <BsCheckLg className="icon-button" />
                                                            Salvar
                                                </button>
                                                    :
                                                <button
                                                    id="btn-save"
                                                    className="buttons"
                                                    onClick={() => handleSubmit("btn-save")}>
                                                        <BsCheckLg className="icon-button" />
                                                            Salvar
                                                </button>}
                                            {analystID ?
                                                <button
                                                    id="btn-insert"
                                                    className="buttons"
                                                    disabled>
                                                        <BiPlusMedical className="icon-button" />
                                                            Inserir
                                                </button>
                                                    :
                                                <button
                                                    id="btn-insert"
                                                    className="buttons"
                                                    onClick={() => handleSubmit("btn-insert")}>
                                                        <BiPlusMedical className="icon-button" />
                                                            Inserir
                                                </button>}
                                            <button
                                                id="btn-cancel"
                                                className="buttons"
                                                onClick={() => handleSubmit("btn-cancel")}>
                                                    <MdOutlineCancel className="icon-button" />
                                                        Cancelar
                                            </button>
                                            {!analystID ?
                                                <button
                                                    id="btn-delete"
                                                    className="buttons"
                                                    disabled>
                                                        <RiDeleteBin5Line className="icon-button" />
                                                            Excluir
                                                </button>
                                                    :
                                                <button
                                                    id="btn-delete"
                                                    className="buttons"
                                                    onClick={() => handleSubmit("btn-delete")}>
                                                        <RiDeleteBin5Line className="icon-button" />
                                                            Excluir
                                                </button>}
                                            <button
                                                id="btn-occurrences"
                                                className="buttons"
                                                disabled
                                                onClick={() => handleSubmit("btn-occurrences")}>
                                                    <BsCalendarDate className="icon-button" />
                                                        Ocorrências
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    )
}

export default RegistrationAnalyst