import React, { Fragment, useState, useEffect } from 'react';

import { BsCheckLg } from 'react-icons/bs';
import { BiPlusMedical } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import NavBar from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';
import DataRegistrationTable from '../../../components/table/registration/teamsRegistrationTable';
import Loading from '../../../components/loading';
import ConfirmDelete from '../../../components/confirmDelete';

import { warningMessage, successMessage, errorMessage } from '../../../components/messages';
import { teamsRegistration, teamsEdit, teamsDelete, userList } from '../../../services/api';

import '../style.css';
import { addClassRowSelected, removeClassRowSelected } from '../script.js';

const RegistrationTeam = () => {
  const [dataUser, setDataUser] = useState();

  const [teamId, setTeamId] = useState();
  const [nameTeam, setNameTeam] = useState('');
  const [helperId, setHelperId] = useState('');
  const [managerId, setManagerId] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleInsertData = (data) => {
    addClassRowSelected(data.id_team, '.rows-table-team');

    setTeamId(data.id_team);
    setNameTeam(data.name);
    setHelperId(data.helper_id);
    setManagerId(data.gestor_id);
  };

  const clearImputs = () => {
    removeClassRowSelected('.rows-table-team');

    setTeamId('');
    setNameTeam('');
    setHelperId('');
    setManagerId('');
  };

  const handleSubmit = (idButton) => {
    switch (idButton) {
      case 'btn-save':
        if (!nameTeam || helperId == '0' || managerId == '0') {
          warningMessage('Preencha/Selecione os campos antes de salvar', 'Aviso');
        } else {
          handleTeamsEdit(teamId, nameTeam, helperId, managerId);
        }
        break;
      case 'btn-insert':
        if (!nameTeam || helperId == '0' || managerId == '0') {
          warningMessage('Preencha/Selecione os campos antes de inserir', 'Aviso');
        } else {
          handleTeamsRegistration(nameTeam, helperId, managerId);
        }
        break;
      case 'btn-cancel':
        clearImputs();
        break;
    }
  };

  const handleTeamsRegistration = async (name, helperId, managerId) => {
    setIsLoading(true);
    await teamsRegistration(name, helperId, managerId)
      .then((resp) => {
        successMessage(resp.data.message, 'Sucesso');
        clearImputs();
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

  const handleTeamsEdit = async (teamId, name, helperId, managerId) => {
    setIsLoading(true);
    await teamsEdit(teamId, name, helperId, managerId)
      .then((resp) => {
        successMessage(resp.data.message, 'Sucesso');
        clearImputs();
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

  const handleTeamsDelete = async (teamId) => {
    setIsLoading(true);
    await teamsDelete(teamId)
      .then((resp) => {
        successMessage(resp.data.message, 'Sucesso');
        clearImputs();
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
    userList()
      .then((resp) => {
        setDataUser(resp.data);
      })
      .catch((err) => {
        errorMessage('Erro ao carregar os Gestores e/ou Helpers', 'Erro');
      });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Sidebar />
      {isLoading ? (
        <div className="body_site row">
          <Loading />
          <div className="row">
            <span className="reg-title">Manuten????o de Times</span>
            <hr />
          </div>
          <div className="row">
            <div className="col-3">
              <div className="col-12">
                <DataRegistrationTable handleInsertData={handleInsertData} />
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
                          value={nameTeam}
                          onChange={(e) => setNameTeam(e.target.value)}
                          placeholder="name"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Nome</label>
                      </div>
                      <div className="row mb-4">
                        <div className="col-6">
                          <div className="form-group form-group-registration">
                            <select
                              id="managerid"
                              value={managerId}
                              onChange={(e) => setManagerId(e.target.value)}
                              placeholder="Gestor"
                              className="form-select form-select-sm"
                            >
                              <option value="0">Selecione o Gestor</option>
                              {dataUser !== undefined &&
                                dataUser.map((item, index) => (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                            <label className="form-label form-label-registration">Gestor</label>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group form-group-registration">
                            <select
                              id="helperid"
                              value={helperId}
                              onChange={(e) => setHelperId(e.target.value)}
                              placeholder="Helper"
                              className="form-select form-select-sm"
                            >
                              <option value="0">Selecione o Helper</option>
                              {dataUser !== undefined &&
                                dataUser.map((item, index) => (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                            <label className="form-label form-label-registration">Helper</label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-3">
                    <button
                      id="btn-save"
                      onClick={() => handleSubmit('btn-save')}
                      className="buttons"
                    >
                      <BsCheckLg className="icon-button" />
                      Salvar
                    </button>
                    <button
                      id="btn-insert"
                      onClick={() => handleSubmit('btn-insert')}
                      className="buttons"
                    >
                      <BiPlusMedical className="icon-button" />
                      Inserir
                    </button>
                    <button
                      id="btn-cancel"
                      onClick={() => handleSubmit('btn-cancel')}
                      className="buttons"
                    >
                      <MdOutlineCancel className="icon-button" />
                      Cancelar
                    </button>
                    <button
                      id="btn-delete"
                      onClick={() => handleSubmit('btn-delete')}
                      className="buttons"
                    >
                      <RiDeleteBin5Line className="icon-button" />
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="body_site row">
          <div className="row">
            <span className="reg-title">Manuten????o de Times</span>
            <hr />
          </div>
          <div className="row">
            <div className="col-3">
              <div className="col-12">
                <DataRegistrationTable handleInsertData={handleInsertData} />
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
                          value={nameTeam}
                          onChange={(e) => setNameTeam(e.target.value)}
                          placeholder="name"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Nome</label>
                      </div>
                      <div className="row mb-4">
                        <div className="col-6">
                          <div className="form-group form-group-registration">
                            <select
                              id="managerid"
                              value={managerId}
                              onChange={(e) => setManagerId(e.target.value)}
                              placeholder="Gestor"
                              className="form-select form-select-sm"
                            >
                              <option value="0">Selecione o Gestor</option>
                              {dataUser !== undefined &&
                                dataUser.map((item, index) => {
                                  if (item.type == 'G') {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  }
                                })}
                            </select>
                            <label className="form-label form-label-registration">Gestor</label>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group form-group-registration">
                            <select
                              id="helperid"
                              value={helperId}
                              onChange={(e) => setHelperId(e.target.value)}
                              placeholder="Helper"
                              className="form-select form-select-sm"
                            >
                              <option value="0">Selecione o Helper</option>
                              {dataUser !== undefined &&
                                dataUser.map((item, index) => {
                                  if (item.type == 'H') {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  }
                                })}
                            </select>
                            <label className="form-label form-label-registration">Helper</label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-3">
                    {!teamId ? (
                      <button id="btn-save" disabled className="buttons">
                        <BsCheckLg className="icon-button" />
                        Salvar
                      </button>
                    ) : (
                      <button
                        id="btn-save"
                        onClick={() => handleSubmit('btn-save')}
                        className="buttons"
                      >
                        <BsCheckLg className="icon-button" />
                        Salvar
                      </button>
                    )}
                    {teamId ? (
                      <button id="btn-insert" disabled className="buttons">
                        <BiPlusMedical className="icon-button" />
                        Inserir
                      </button>
                    ) : (
                      <button
                        id="btn-insert"
                        onClick={() => handleSubmit('btn-insert')}
                        className="buttons"
                      >
                        <BiPlusMedical className="icon-button" />
                        Inserir
                      </button>
                    )}
                    <button
                      id="btn-cancel"
                      onClick={() => handleSubmit('btn-cancel')}
                      className="buttons"
                    >
                      <MdOutlineCancel className="icon-button" />
                      Cancelar
                    </button>
                    {!teamId ? (
                      <button id="btn-delete" disabled className="buttons">
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
                  </div>
                  <ConfirmDelete
                    location="teams"
                    handleTeamsDelete={handleTeamsDelete}
                    idDel={teamId}
                    nameDel={nameTeam}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default RegistrationTeam;
