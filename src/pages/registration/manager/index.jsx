import React, { Fragment, useState } from "react"

import { BsCheckLg } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import UserRegistrationTable from "../../../components/table/registration/managerRegistrationTable";

import NavBar from "../../../components/navbar";
import Sidebar from '../../../components/sidebar';
import { warningMessage, successMessage, errorMessage } from "../../../components/messages";

import Loading from "../../../components/loading";

import "../style.css"
import { managerRegistration, managerDelete, managerEdit } from "../../../services/api";

const RegistrationManager = () => {

    const [managerID, setManagerID] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleInsertData = (data) => {
        setManagerID(data.id)
        setName(data.name)
        setEmail(data.email)

        setPassword("")
        setConfirmPassword("")
    }

    const clearInputs = () => {
        setManagerID("")
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#\%!-])[0-9a-zA-Z$*&@#\%!-]/
    const regEmail = /^[a-z]+\.[a-z]+@linx+\.com+\.br/

    const handleSubmit = (idButton) => {
        switch (idButton) {
            case "btn-save":
                if (!name || !email || !password || !confirmPassword) {
                    warningMessage("Preencha os campos antes de salvar", "Aviso")
                } else if (!regEmail.exec(email)) {
                    warningMessage('E-mail inválido. Utilize: "seuusuario@linx.com.br"')
                } else if (!regPass.exec(password) || password.length < 8) {
                    warningMessage("A senha não atende aos critérios de segurança", "Aviso")
                } else if (password !== confirmPassword) {
                    warningMessage("As senhas não conferem", "Aviso")
                } else {
                    handleManagerEdit(managerID, name, email, password)
                }
                break
            case "btn-insert":
                if (!name || !email || !password || !confirmPassword) {
                    warningMessage("Preencha os campos antes de salvar", "Aviso")
                } else if (!regEmail.exec(email)) {
                    warningMessage('E-mail inválido. Utilize: "seuusuario@linx.com.br"')
                } else if (!regPass.exec(password) || password.length < 8) {
                    warningMessage("A senha não atende aos critérios de segurança", "Aviso")
                } else if (password !== confirmPassword) {
                    warningMessage("As senhas não conferem", "Aviso")
                } else {
                    handleManagerRegistration(name, email, password)
                }
                break
            case "btn-cancel":
                window.location.reload()
                break
            case "btn-delete":
                handleManagerDelete(managerID)
                break
        }
    }

    const handleManagerRegistration = async (name, email, password) => {
        setIsLoading(true)
        await managerRegistration(name, email, password)
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

    const handleManagerEdit = async (managerID, name, email, password) => {
        setIsLoading(true)
        await managerEdit(managerID, name, email, password)
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

    const handleManagerDelete = async (managerID) => {
        setIsLoading(true)
        await managerDelete(managerID)
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

    return (
        <Fragment>
            <NavBar />
            <Sidebar />
            {isLoading ?
                <Fragment>
                    <div className="body_site row">
                        <Loading/>
                        <div className="row">
                            <span className="reg-title">Manutenção de Gestores</span>
                            <hr />
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <div className=" col-12">
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
                                                                    <li key={1}>Pelo menos 8 caracteres.</li>
                                                                    <li key={2}>1 letra maiuscula e minuscula.</li>
                                                                    <li key={3}>1 caracter especial.</li>
                                                                    <li key={4}>1 número.</li>
                                                                </ul>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-3">
                                            <button
                                                id="btn-save"
                                                onClick={() => handleSubmit("btn-save")}
                                                className="buttons">
                                                <BsCheckLg className="icon-button" />
                                                Salvar
                                            </button>
                                            <button
                                                id="btn-insert"
                                                onClick={() => handleSubmit("btn-insert")}
                                                className="buttons">
                                                <BiPlusMedical className="icon-button" />
                                                Inserir
                                            </button>
                                            <button
                                                id="btn-cancel"
                                                onClick={() => handleSubmit("btn-cancel")}
                                                className="buttons">
                                                <MdOutlineCancel className="icon-button" />
                                                Cancelar
                                            </button>
                                            <button
                                                id="btn-delete"
                                                onClick={() => handleSubmit("btn-delete")}
                                                className="buttons">
                                                <RiDeleteBin5Line className="icon-button" />
                                                Excluir
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
                            <span className="reg-title">Manutenção de Gestores</span>
                            <hr />
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <div className=" col-12">
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
                                                                    <li key={1}>Pelo menos 8 caracteres.</li>
                                                                    <li key={2}>1 letra maiuscula e minuscula.</li>
                                                                    <li key={3}>1 caracter especial.</li>
                                                                    <li key={4}>1 número.</li>
                                                                </ul>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-3">
                                            {!managerID ?
                                                <button
                                                    id="btn-save"
                                                    disabled
                                                    className="buttons">
                                                        <BsCheckLg className="icon-button" />
                                                            Salvar
                                                </button>
                                                    :
                                                <button
                                                    id="btn-save"
                                                    onClick={() => handleSubmit("btn-save")}
                                                    className="buttons">
                                                        <BsCheckLg className="icon-button" />
                                                            Salvar
                                                </button>}
                                            {managerID ?
                                                <button
                                                    id="btn-insert"
                                                    disabled
                                                    className="buttons">
                                                        <BiPlusMedical className="icon-button" />
                                                            Inserir
                                                </button>
                                                    :
                                                <button
                                                    id="btn-insert"
                                                    onClick={() => handleSubmit("btn-insert")}
                                                    className="buttons">
                                                        <BiPlusMedical className="icon-button" />
                                                            Inserir
                                                </button>}
                                            <button
                                                id="btn-cancel"
                                                onClick={() => handleSubmit("btn-cancel")}
                                                className="buttons">
                                                    <MdOutlineCancel className="icon-button" />
                                                        Cancelar
                                            </button>
                                            {!managerID ? 
                                                <button
                                                    id="btn-delete"
                                                    disabled
                                                    className="buttons">
                                                        <RiDeleteBin5Line className="icon-button" />
                                                            Excluir
                                                </button>
                                                    :
                                                <button
                                                    id="btn-delete"
                                                    onClick={() => handleSubmit("btn-delete")}
                                                    className="buttons">
                                                        <RiDeleteBin5Line className="icon-button" />
                                                            Excluir
                                                </button>}
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

export default RegistrationManager