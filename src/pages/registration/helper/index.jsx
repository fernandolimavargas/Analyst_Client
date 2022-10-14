import React, { Fragment, useState } from "react"

import { BsCheckLg } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import UserRegistrationTable from "../../../components/table/registration/helperRegistrationTable";

import NavBar from "../../../components/navbar";
import Sidebar from '../../../components/sidebar';

import Loading from "../../../components/loading";

import { warningMessage, successMessage, errorMessage } from "../../../components/messages";

import { helperRegistration, helperDelete, helperEdit } from "../../../services/api";

import "../style.css"

const RegistrationHelper = () => {
    
    const [helperID, setHelperID] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const handleInsertData = (data) => {
        setHelperID(data.id)
        setName(data.name)
        setEmail(data.email)

        setPassword("")
        setConfirmPassword("")
    }

    const clearInputs = () => {
        setName("")
        setEmail("")
        setHelperID("")
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
                } else if (password !== confirmPassword){
                    warningMessage("As senhas não conferem", "Aviso")
                } else {
                    handleHelperEdit(helperID, name, email, password)
                }
                break
            case "btn-insert":
                if (!name || !email || !password || !confirmPassword) {
                    warningMessage("Preencha os campos antes de inserir", "Aviso")
                } else if (!regEmail.exec(email)) {
                    warningMessage('E-mail inválido. Utilize: "seuusuario@linx.com.br"')
                } else if (!regPass.exec(password) || password.length < 8) {
                    warningMessage("A senha não atende aos critérios de segurança", "Aviso")
                } else if (password !== confirmPassword){
                    warningMessage("As senhas não conferem", "Aviso")
                } else {
                    handleHelperRegistration(name, email, password)
                }
                break
            case "btn-cancel":
                window.location.reload()
                break
            case "btn-delete":
                if (!email) {
                    warningMessage("Selecione um usuário para deletar", "Aviso")
                } else {
                    handleHelperDelete(helperID)
                }
                break
        }
    }

    const handleHelperEdit = async (helperID, name, email, password) => {
        setIsLoading(true)
        await helperEdit(helperID, name, email, password).then((resp) => {
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

    const handleHelperDelete = async (helperID) => {
        setIsLoading(true)
        await helperDelete(helperID).then((resp) => {
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

    const handleHelperRegistration = async (name, email, password) => {
        setIsLoading(true)
        await helperRegistration(name, email, password).then((resp) => {
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
                <div className="body_site row">
                    <Loading />
                    <div className="row">
                        <span className="reg-title">Manutenção de Helpers</span>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className=" col-12">
                                <UserRegistrationTable />
                            </div>
                        </div>
                        <div className="registration col-9">
                            <div className="col-12">
                                <form>
                                    <div className="row">
                                        <div className="reg-form col-9">
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
                                                            <div className="invalid-feedback">
                                                                <p>
                                                                    {!password && "Campo Obrigatório."}
                                                                    {password.length < 7 && password.length > 1 && "A senha deve ter pelo menos 8 caracteres"}
                                                                </p>
                                                            </div>
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
                                                            <div className="invalid-feedback">
                                                                <p>
                                                                    {password != confirmPassword && "As senhas não conferem."}
                                                                </p>
                                                            </div>
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
                                        </div>
                                        <div className="col-3">
                                            <button
                                                id="btn-save"
                                                disabled
                                                className="buttons"><BsCheckLg className="icon-button" />Salvar</button>
                                            <button
                                                id="btn-insert"
                                                type="submit"
                                                className="buttons"><BiPlusMedical className="icon-button" />Inserir</button>
                                            <button
                                                id="btn-cancel"
                                                type="button"
                                                disabled
                                                className="buttons"><MdOutlineCancel className="icon-button" />Cancelar</button>
                                            <button
                                                id="btn-delete"
                                                type="button"
                                                disabled
                                                className="buttons"><RiDeleteBin5Line className="icon-button" />Excluir</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="body_site row">
                    <div className="row">
                        <span className="reg-title">Manutenção de Helpers</span>
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
                                                            <div className="invalid-feedback">
                                                                <p>
                                                                    {!password && "Campo Obrigatório."}
                                                                    {password.length < 7 && password.length > 1 && "A senha deve ter pelo menos 8 caracteres"}
                                                                </p>
                                                            </div>
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
                                                            <div className="invalid-feedback">
                                                                <p>
                                                                    {password != confirmPassword && "As senhas não conferem."}
                                                                </p>
                                                            </div>
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
                                        {!helperID ?
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
                                        {helperID ?
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
                                        {!helperID ?
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
                </div>}
        </Fragment>
    )
}

export default RegistrationHelper