import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserIcon from '@rsuite/icons/legacy/User';
import { AvatarGroup, Avatar } from 'rsuite';
import { BsCheckLg } from 'react-icons/bs';
import { IoInformationCircle } from 'react-icons/io5';
import { TbArrowBackUp } from 'react-icons/tb';

import NavBar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import LoadingTables from '../../components/loadingTables';
import Loading from '../../components/loading';
import { errorMessage, successMessage, warningMessage } from '../../components/messages';

import { userList, userAlteration } from '../../services/api';

import './style.css';

const UserProfile = () => {
  const [dataUser, setDataUser] = useState();
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

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#\%!-])[0-9a-zA-Z$*&@#\%!-]/;

  const handleSubmit = () => {
    if (!name || !email) {
      warningMessage('Campo obrigátorio não preenchido.', 'Aviso');
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
    userList(true).then((resp) => {
      setDataUser(resp.data);
      setUserID(resp.data[0].id);
      setUserType(resp.data[0].type);
      setName(resp.data[0].name);
      setEmail(resp.data[0].email);
      setCommitee(resp.data[0].committee);
      setInactive(resp.data[0].inactive);
      setOffice(resp.data[0].office);
      setGoal(resp.data[0].goal);
      setTeam(resp.data[0].team);
    });
  }, []);

  const returnOffice = (office) => {
    let off;
    if (office == '1') {
      off = 'Analista JR I';
    }
    if (office == '2') {
      off = 'Analista JR II';
    }
    if (office == '3') {
      off = 'Analista PL I';
    }
    if (office == '4') {
      off = 'Analista PL II';
    }
    if (office == '5') {
      off = 'Analista SR I';
    }
    if (office == '6') {
      off = 'Analista SR II';
    }
    return off;
  };

  return (
    <Fragment>
      <NavBar />
      <Sidebar />
      <div className="body_site row">
        <div className="row">
          <span className="list-title">Manutenção de Perfil</span>
          <hr />
        </div>
        {dataUser == undefined ? (
          <div className="d-flex justify-content-center row">
            <div className="registration col-8">
              <div className="col-12">
                <div className="row">
                  <div className="reg-form reg-form-profile col-12">
                    <LoadingTables />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Fragment>
            {isLoading ? (
              <Fragment>
                <Loading />
                <div className="d-flex justify-content-center row">
                  <div className="registration col-8">
                    <div className="reg-form reg-form-profile">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-3">
                            <div className="avatar-icon">
                              <AvatarGroup>
                                <Avatar>
                                  <UserIcon />
                                </Avatar>
                              </AvatarGroup>
                            </div>
                            {userType == 'A' && (
                              <div className="form-group-profile">
                                <label className="form-label d-flex justify-content-center">
                                  {returnOffice(dataUser[0].office)}
                                </label>
                                <hr />
                                <label className="form-label d-flex justify-content-center">
                                  Gestor: {dataUser[0].gestor}
                                </label>
                                <label className="form-label d-flex justify-content-center">
                                  Helper: {dataUser[0].helper}
                                </label>
                              </div>
                            )}
                            {userType == 'C' && (
                              <div className="form-group-profile">
                                <label className="form-label d-flex justify-content-center">
                                  Coordenador
                                </label>
                              </div>
                            )}
                            {userType == 'G' && (
                              <div className="form-group-profile">
                                <label className="form-label d-flex justify-content-center">
                                  Gestor
                                </label>
                              </div>
                            )}
                            {userType == 'H' && (
                              <div className="form-group-profile">
                                <label className="form-label d-flex justify-content-center">
                                  Helper
                                </label>
                                <hr />
                                <label className="form-label d-flex justify-content-center">
                                  Gestor: {dataUser[0].gestor}
                                </label>
                              </div>
                            )}
                          </div>
                          <div className="col-9 mt-1">
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
                            <div className="form-group form-group-registration mb-3">
                              <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email"
                                readOnly="readonly"
                                className="form-control form-control-sm form-input"
                              />
                              <label className="form-label form-label-registration">E-mail</label>
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
                                    <label className="form-label form-label-registration">
                                      Senha
                                    </label>
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
                              <div className="col-6 roles-password">
                                <fieldset className="border field-roles">
                                  <legend className="float-none w-auto">
                                    A senha deve conter
                                    <IoInformationCircle
                                      id="IoInformationCircle"
                                      class="d-inline-block"
                                      tabindex="0"
                                      data-toggle="tooltip"
                                      title="Para manter a senha atual, deixe os campos de senha e confirmação de senha em branco."
                                    />
                                  </legend>
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
                        </div>
                      </form>
                      <div className="row div-buttons-profile">
                        <div className="col-3">
                          <button onClick={() => handleSubmit()} className="buttons">
                            <BsCheckLg className="icon-button" />
                            Salvar
                          </button>
                        </div>
                        <div className="col-3">
                          <button onClick={() => navigate('/dashboard')} className="buttons">
                            <TbArrowBackUp className="icon-button TbArrowBackUp" />
                            Voltar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="d-flex justify-content-center row">
                <div className="registration col-8">
                  <div className="reg-form reg-form-profile">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-3">
                          <div className="avatar-icon">
                            <AvatarGroup>
                              <Avatar>
                                <UserIcon />
                              </Avatar>
                            </AvatarGroup>
                          </div>
                          {userType == 'A' && (
                            <div className="form-group-profile">
                              <label className="form-label d-flex justify-content-center">
                                {returnOffice(dataUser[0].office)}
                              </label>
                              <hr />
                              <label className="form-label d-flex justify-content-center">
                                Gestor: {dataUser[0].gestor}
                              </label>
                              <label className="form-label d-flex justify-content-center">
                                Helper: {dataUser[0].helper}
                              </label>
                            </div>
                          )}
                          {userType == 'C' && (
                            <div className="form-group-profile">
                              <label className="form-label d-flex justify-content-center">
                                Coordenador
                              </label>
                            </div>
                          )}
                          {userType == 'G' && (
                            <div className="form-group-profile">
                              <label className="form-label d-flex justify-content-center">
                                Gestor
                              </label>
                            </div>
                          )}
                          {userType == 'H' && (
                            <div className="form-group-profile">
                              <label className="form-label d-flex justify-content-center">
                                Helper
                              </label>
                              <hr />
                              <label className="form-label d-flex justify-content-center">
                                Gestor: {dataUser[0].gestor}
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="col-9 mt-1">
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
                          <div className="form-group form-group-registration mb-3">
                            <input
                              id="email"
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="email"
                              readOnly="readonly"
                              className="form-control form-control-sm form-input"
                            />
                            <label className="form-label form-label-registration">E-mail</label>
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
                                  <label className="form-label form-label-registration">
                                    Senha
                                  </label>
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
                            <div className="col-6 roles-password">
                              <fieldset className="border field-roles">
                                <legend className="float-none w-auto">
                                  A senha deve conter
                                  <IoInformationCircle
                                    id="IoInformationCircle"
                                    class="d-inline-block"
                                    tabindex="0"
                                    data-toggle="tooltip"
                                    title="Para manter a senha atual, deixe os campos de senha e confirmação de senha em branco."
                                  />
                                </legend>
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
                      </div>
                    </form>
                    <div className="row div-buttons-profile">
                      <div className="col-3">
                        <button onClick={() => handleSubmit()} className="buttons">
                          <BsCheckLg className="icon-button" />
                          Salvar
                        </button>
                      </div>
                      <div className="col-3">
                        <button onClick={() => navigate('/dashboard')} className="buttons">
                          <TbArrowBackUp className="icon-button TbArrowBackUp" />
                          Voltar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default UserProfile;
