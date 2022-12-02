import React, { Fragment, useState, useEffect } from 'react';

import { BsCheckLg } from 'react-icons/bs';
import { BiPlusMedical } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BsCalendarDate } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';

import { warningMessage, successMessage, errorMessage } from '../../../components/messages';

import UserRegistrationTable from '../../../components/table/registration/userRegistrationTable';
import Loading from '../../../components/loading';
import NavBar from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';
import ConfirmDelete from '../../../components/confirmDelete';
import OccurrencesAnalyst from './occurrences';

import { userAlteration, userDelete, userRegistration, teamsList } from '../../../services/api';

import '../style.css';
import { addClassRowSelected, removeClassRowSelected } from '../script';

const RegistrationUser = () => {
  const [userID, setUserID] = useState();
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [committee, setCommitee] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [office, setOffice] = useState('');
  const [goal, setGoal] = useState('');
  const [team, setTeam] = useState('');
  const [dataTeam, setDataTeam] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const handleInsertData = (data) => {
    addClassRowSelected(data.id, '.rows-table-user');

    setUserID(data.id);
    setName(data.name);
    setUserType(data.type);
    setEmail(data.email);
    if (data.committee == 'S') {
      setCommitee(true);
    } else {
      setCommitee(false);
    }
    if (data.inactive == 'S') {
      setInactive(true);
    } else {
      setInactive(false);
    }
    setOffice(data.office);
    setGoal(data.goal);
    setTeam(data.team);
  };

  const clearInputs = () => {
    removeClassRowSelected('.rows-table-user');

    setUserID('');
    setName('');
    setUserType('');
    setEmail('');
    setCommitee(false);
    setInactive(false);
    setOffice('');
    setGoal('');
    setTeam('');
    setPassword('');
    setConfirmPassword('');
  };

  const alterTypeUser = (e) => {
    setUserType(e.target.value);

    if (userType != 'A') {
      setOffice('');
      setGoal('');
      setTeam('');
    }
  };

  const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#\%!-])[0-9a-zA-Z$*&@#\%!-]/;
  const regEmail = /^[a-z]+\.[a-z]+@linx+\.com+\.br/;

  const regGoal = new RegExp('^[0-9]+$');

  const handleSubmit = (idButton) => {
    switch (idButton) {
      case 'btn-save':
        if (userType == 'A') {
          if (!name || !email || office == 0 || !goal || !team) {
            warningMessage('Preencha os campos antes de salvar', 'Aviso');
          } else if (!regEmail.exec(email)) {
            warningMessage('E-mail inválido. Utilize: "seuusuario@linx.com.br"');
          } else if (password.length > 0) {
            if (!regPass.exec(password) || password.length < 8) {
              warningMessage('A senha não atende aos critérios de segurança', 'Aviso');
            } else if (password !== confirmPassword) {
              warningMessage('As senhas não conferem', 'Aviso');
            } else {
              handleUserAlteration(
                userID,
                userType,
                name,
                email,
                committee,
                inactive,
                password,
                office,
                goal,
                team
              );
            }
          } else if (!regGoal.exec(goal)) {
            warningMessage('Só é permitido números no campo "Meta"', 'Aviso');
          } else {
            handleUserAlteration(
              userID,
              userType,
              name,
              email,
              committee,
              inactive,
              password,
              office,
              goal,
              team
            );
          }
        } else {
          if (!name || !email) {
            warningMessage('Preencha os campos antes de salvar', 'Aviso');
          } else if (!regEmail.exec(email)) {
            warningMessage('E-mail inválido. Utilize: "seuusuario@linx.com.br"');
          } else if (password.length > 0) {
            if (!regPass.exec(password) || password.length < 8) {
              warningMessage('A senha não atende aos critérios de segurança', 'Aviso');
            } else if (password !== confirmPassword) {
              warningMessage('As senhas não conferem', 'Aviso');
            } else {
              handleUserAlteration(
                userID,
                userType,
                name,
                email,
                committee,
                inactive,
                password,
                office,
                goal,
                team
              );
            }
          } else {
            handleUserAlteration(
              userID,
              userType,
              name,
              email,
              committee,
              inactive,
              password,
              office,
              goal,
              team
            );
          }
        }
        break;
      case 'btn-insert':
        if (userType == 'A') {
          if (!name || !email || !password || !confirmPassword || office == 0 || !goal || !team) {
            warningMessage('Preencha os campos antes de salvar', 'Aviso');
          } else if (!regEmail.exec(email)) {
            warningMessage('E-mail inválido. Utilize: "seuusuario@linx.com.br"');
          } else if (!regPass.exec(password) || password.length < 8) {
            warningMessage('A senha não atende aos critérios de segurança', 'Aviso');
          } else if (password !== confirmPassword) {
            warningMessage('As senhas não conferem', 'Aviso');
          } else if (!regGoal.exec(goal)) {
            warningMessage('Só é permitido números no campo "Meta"', 'Aviso');
          } else {
            handleUserRegistration(
              userType,
              name,
              email,
              committee,
              inactive,
              password,
              office,
              goal,
              team
            );
          }
        } else {
          if (!name || !email || !password || !confirmPassword) {
            warningMessage('Preencha os campos antes de salvar', 'Aviso');
          } else if (!regEmail.exec(email)) {
            warningMessage('E-mail inválido. Utilize: "seuusuario@linx.com.br"');
          } else if (!regPass.exec(password) || password.length < 8) {
            warningMessage('A senha não atende aos critérios de segurança', 'Aviso');
          } else if (password !== confirmPassword) {
            warningMessage('As senhas não conferem', 'Aviso');
          } else {
            handleUserRegistration(
              userType,
              name,
              email,
              committee,
              inactive,
              password,
              office,
              goal,
              team
            );
          }
        }
        break;
      case 'btn-cancel':
        clearInputs();
        break;
    }
  };

  const handleUserAlteration = async (
    userID,
    userType,
    name,
    email,
    committee,
    inactive,
    password,
    office,
    goal,
    team
  ) => {
    setIsLoading(true);
    if (committee) {
      committee = 'S';
    } else {
      committee = 'N';
    }
    if (inactive) {
      inactive = 'S';
    } else {
      inactive = 'N';
    }
    await userAlteration(
      userID,
      userType,
      name,
      email,
      committee,
      inactive,
      password,
      office,
      goal,
      team
    )
      .then((resp) => {
        successMessage(resp.data.message, 'Sucesso');
        clearInputs();
      })
      .catch((err) => {
        try {
          warningMessage(err.response.data.message, 'Aviso');
        } catch (err) {
          errorMessage('Status Desconhecido.', 'Erro');
        }
      });
    setIsLoading(false);
  };

  const handleUserRegistration = async (
    userType,
    name,
    email,
    committee,
    inactive,
    password,
    office,
    goal,
    team
  ) => {
    setIsLoading(true);
    if (committee) {
      committee = 'S';
    } else {
      committee = 'N';
    }
    if (inactive) {
      inactive = 'S';
    } else {
      inactive = 'N';
    }
    await userRegistration(userType, name, email, committee, inactive, password, office, goal, team)
      .then((resp) => {
        successMessage(resp.data.message, 'Sucesso');
        clearInputs();
      })
      .catch((err) => {
        try {
          warningMessage(err.response.data.message, 'Aviso');
        } catch (err) {
          errorMessage('Status Desconhecido.', 'Erro');
        }
      });
    setIsLoading(false);
  };

  const handleUserDelete = async (userID, userType) => {
    setIsLoading(true);
    await userDelete(userID, userType)
      .then((resp) => {
        successMessage(resp.data.message, 'Sucesso');
        clearInputs();
      })
      .catch((err) => {
        try {
          warningMessage(err.response.data.message, 'Aviso');
        } catch (err) {
          errorMessage('Status Desconhecido.', 'Erro');
        }
      });
    setIsLoading(false);
  };

  useEffect(() => {
    teamsList()
      .then((resp) => {
        setDataTeam(resp.data);
      })
      .catch((err) => {
        try {
          errorMessage(err.response.data.message, 'Erro');
        } catch (err) {
          errorMessage('Ocorreu um erro ao carregar os times.', 'Erro');
        }
      });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Sidebar />
      {isLoading ? (
        <Fragment>
          <div className="body_site row">
            <Loading />
            <div className="row">
              <span className="reg-title">Manutenção de Usuários</span>
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
                            className="form-control form-control-sm form-input"
                          />
                          <label className="form-label form-label-registration">Nome</label>
                        </div>
                        <div className="form-group form-group-registration mb-4">
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                            className="form-control form-control-sm form-input"
                          />
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
                                  className="form-control form-control-sm form-input"
                                />
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
                                  className="form-control form-control-sm form-input"
                                />
                                <label className="form-label form-label-registration">
                                  Confirmação de Senha
                                </label>
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
                                className="form-select form-select-sm"
                              >
                                <option value="0">Selecione o Cargo</option>
                                <option value="1">Analista Jr I</option>
                                <option value="2">Analista Jr II</option>
                                <option value="3">Analista Pl I</option>
                                <option value="4">Analista Pl II</option>
                                <option value="5">Analista Sr I</option>
                                <option value="6">Analista Sr II</option>
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
                                className="form-control form-control-sm form-input"
                              />
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
                                className="form-select form-select-sm"
                              >
                                <option value="0">Selecione o Time</option>
                                {dataTeam !== undefined &&
                                  dataTeam.map((id, index) => (
                                    <option key={index} value={id.id_team}>
                                      {id.name}
                                    </option>
                                  ))}
                              </select>
                              <label className="form-label form-label-registration">Time</label>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <dov className="col-3">
                            <div className="form-control-checkbox">
                              <input
                                className="input-checkbox"
                                type="checkbox"
                                checked={inactive}
                                onChange={(e) => setInactive(e.target.checked)}
                              />
                              <label className="form-label-checkbox">Usuário Inativo</label>
                            </div>
                          </dov>
                          {userType == 'H' && (
                            <div className="col-3">
                              <div className="form-control-checkbox">
                                <input
                                  className="input-checkbox"
                                  type="checkbox"
                                  checked={committee}
                                  onChange={(e) => setCommitee(e.target.checked)}
                                />
                                <label className="form-label-checkbox">Aprova Comitê</label>
                              </div>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                    <div className="col-3">
                      <button
                        id="btn-save"
                        className="buttons"
                        onClick={() => handleSubmit('btn-save')}
                      >
                        <BsCheckLg className="icon-button" />
                        Salvar
                      </button>
                      <button
                        id="btn-insert"
                        className="buttons"
                        onClick={() => handleSubmit('btn-insert')}
                      >
                        <BiPlusMedical className="icon-button" />
                        Inserir
                      </button>
                      <button
                        id="btn-cancel"
                        className="buttons"
                        onClick={() => handleSubmit('btn-cancel')}
                      >
                        <MdOutlineCancel className="icon-button" />
                        Cancelar
                      </button>
                      <button
                        id="btn-delete"
                        className="buttons"
                        onClick={() => handleSubmit('btn-delete')}
                      >
                        <RiDeleteBin5Line className="icon-button" />
                        Excluir
                      </button>
                      <button
                        id="btn-occurrences"
                        className="buttons"
                        onClick={() => handleSubmit('btn-occurrences')}
                      >
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
      ) : (
        <Fragment>
          <div className="body_site row">
            <div className="row">
              <span className="reg-title">Manutenção de Usuários</span>
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
                        <div className="row">
                          <div className="col-9">
                            <div className="form-group form-group-registration mb-4">
                              <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="name"
                                className="form-control form-control-sm form-input"
                              />
                              <label className="form-label form-label-registration">Nome</label>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group form-group-registration">
                              <select
                                id="userType"
                                value={userType}
                                onChange={(e) => alterTypeUser(e)}
                                placeholder="userType"
                                className="form-select form-select-sm"
                              >
                                <option value="0">Selecione</option>
                                <option value="A">Analista</option>
                                <option value="H">Helper</option>
                                <option value="G">Gestor</option>
                                <option value="C">Coordenador</option>
                              </select>
                              <label className="form-label form-label-registration">Tipo</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group form-group-registration mb-3">
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                            className="form-control form-control-sm form-input"
                          />
                          <label className="form-label form-label-registration">E-Mail</label>
                        </div>
                        <div className="row mb-3 input-pass-roles">
                          <div className="col-6">
                            <div className="col-12 mb-4">
                              <div className="form-group form-group-registration">
                                <input
                                  id="password"
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  placeholder="password"
                                  className="form-control form-control-sm form-input"
                                />
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
                                  className="form-control form-control-sm form-input"
                                />
                                <label className="form-label form-label-registration">
                                  Confirmação de Senha
                                </label>
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
                        {userType == 'A' && (
                          <div className="row mb-3">
                            <div className="col-5">
                              <div className="form-group form-group-registration">
                                <select
                                  id="office"
                                  value={office}
                                  onChange={(e) => setOffice(e.target.value)}
                                  placeholder="office"
                                  className="form-select form-select-sm"
                                >
                                  <option value="0">Selecione o Cargo</option>
                                  <option value="1">Analista Jr I</option>
                                  <option value="2">Analista Jr II</option>
                                  <option value="3">Analista Pl I</option>
                                  <option value="4">Analista Pl II</option>
                                  <option value="5">Analista Sr I</option>
                                  <option value="6">Analista Sr II</option>
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
                                  className="form-control form-control-sm form-input"
                                />
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
                                  className="form-select form-select-sm"
                                >
                                  <option value="0">Selecione o Time</option>
                                  {dataTeam !== undefined &&
                                    dataTeam.map((id, index) => (
                                      <option key={index} value={id.id_team}>
                                        {id.name}
                                      </option>
                                    ))}
                                </select>
                                <label className="form-label form-label-registration">Time</label>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="row mb-2">
                          <div className="col-3">
                            <div className="form-control-checkbox">
                              <input
                                className="input-checkbox"
                                type="checkbox"
                                checked={inactive}
                                onChange={(e) => setInactive(e.target.checked)}
                              />
                              <label className="form-label-checkbox">Usuário Inativo</label>
                            </div>
                          </div>
                          {userType == 'H' && (
                            <div className="col-3">
                              <div className="form-control-checkbox">
                                <input
                                  className="input-checkbox"
                                  type="checkbox"
                                  checked={committee}
                                  onChange={(e) => setCommitee(e.target.checked)}
                                />
                                <label className="form-label-checkbox">Aprova Comitê</label>
                              </div>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                    <div className="col-3">
                      {!userID ? (
                        <button id="btn-save" className="buttons" disabled>
                          <BsCheckLg className="icon-button" />
                          Salvar
                        </button>
                      ) : (
                        <button
                          id="btn-save"
                          className="buttons"
                          onClick={() => handleSubmit('btn-save')}
                        >
                          <BsCheckLg className="icon-button" />
                          Salvar
                        </button>
                      )}
                      {userID ? (
                        <button id="btn-insert" className="buttons" disabled>
                          <BiPlusMedical className="icon-button" />
                          Inserir
                        </button>
                      ) : (
                        <button
                          id="btn-insert"
                          className="buttons"
                          onClick={() => handleSubmit('btn-insert')}
                        >
                          <BiPlusMedical className="icon-button" />
                          Inserir
                        </button>
                      )}
                      <button
                        id="btn-cancel"
                        className="buttons"
                        onClick={() => handleSubmit('btn-cancel')}
                      >
                        <MdOutlineCancel className="icon-button" />
                        Cancelar
                      </button>
                      {!userID ? (
                        <button id="btn-delete" className="buttons" disabled>
                          <RiDeleteBin5Line className="icon-button" />
                          Excluir
                        </button>
                      ) : (
                        <button
                          id="btn-delete"
                          className="buttons"
                          data-bs-toggle="modal"
                          data-bs-target="#modal-confirm-delete"
                        >
                          <RiDeleteBin5Line className="icon-button" />
                          Excluir
                        </button>
                      )}
                      {!userID ? (
                        <button id="btn-occurrences" className="buttons" disabled type="button">
                          <BsCalendarDate className="icon-button" />
                          Ocorrências
                        </button>
                      ) : (
                        <button
                          id="btn-occurrences"
                          className="buttons"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#occurrencesAnalyst"
                          onClick={() => handleSubmit('btn-occurrences')}
                        >
                          <BsCalendarDate className="icon-button" />
                          Ocorrências
                        </button>
                      )}
                    </div>
                    <OccurrencesAnalyst name={name} id={userID} />
                  </div>
                  <ConfirmDelete
                    location="users"
                    handleUserDelete={handleUserDelete}
                    idDel={userID}
                    nameDel={name}
                    userType={userType}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default RegistrationUser;
