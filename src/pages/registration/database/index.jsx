import React, { Fragment, useState } from 'react';

import { BsCheckLg } from 'react-icons/bs';
import { BiPlusMedical } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import NavBar from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';

import DataRegistrationTable from '../../../components/table/registration/databaseRegistrationTable';
import Loading from '../../../components/loading';
import ConfirmDelete from '../../../components/confirmDelete';

import { databaseDelete, databaseRegistration, databaseEdit } from '../../../services/api';
import { successMessage, warningMessage, errorMessage } from '../../../components/messages';

import '../style.css';
import { addClassRowSelected, removeClassRowSelected } from '../script.js';

const RegistrationDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [dbID, setDbID] = useState('');
  const [structure, setStructure] = useState('Oracle');
  const [dtaDmpBak, setDtaDmpBak] = useState('');
  const [client, setClient] = useState('');
  const [brands, setBrands] = useState('');
  const [server, setServer] = useState('');
  const [instance, setInstance] = useState('');
  const [charset, setCharset] = useState('');
  const [dbUser, setDbUser] = useState('');
  const [size, setSize] = useState('');

  const handleInsertData = (data) => {
    addClassRowSelected(data.id, '.rows-table-db');

    setDbID(data.id);
    setStructure(data.structure);
    setDtaDmpBak(data.dtaDmpBak);
    setClient(data.name);
    setBrands(data.brands);
    setServer(data.server);
    setInstance(data.instance);
    setCharset(data.charset);
    setDbUser(data.dbUser);
    setSize(data.size);
  };

  const clearImputs = () => {
    removeClassRowSelected('.rows-table-db');

    setDbID('');
    setStructure('Oracle');
    setDtaDmpBak('');
    setClient('');
    setBrands('');
    setServer('');
    setInstance('');
    setCharset('');
    setDbUser('');
    setSize('');
  };

  const regSize = new RegExp('^[0-9]+$');

  const handleSubmit = (idButton) => {
    switch (idButton) {
      case 'btn-save':
        if (
          !structure ||
          !client ||
          !brands ||
          !server ||
          !instance ||
          !charset ||
          !dbUser ||
          !size ||
          !dtaDmpBak
        ) {
          warningMessage('Preencha todos os campos antes de salvar', 'Aviso');
        } else if (!regSize.exec(size)) {
          warningMessage('Só é permitido números no campo "Tamanho"', 'Aviso');
        } else {
          handleDatabaseEdit(
            dbID,
            structure,
            client,
            brands,
            server,
            instance,
            charset,
            dbUser,
            size,
            dtaDmpBak
          );
        }
        break;
      case 'btn-insert':
        if (
          !structure ||
          !client ||
          !brands ||
          !server ||
          !instance ||
          !charset ||
          !dbUser ||
          !size ||
          !dtaDmpBak
        ) {
          warningMessage('Preencha todos os campos antes de enviar', 'Aviso');
        } else if (!regSize.exec(size)) {
          warningMessage('Só é permitido números no campo "Tamanho"', 'Aviso');
        } else {
          handleDatabaseRegistration(
            structure,
            client,
            brands,
            server,
            instance,
            charset,
            dbUser,
            size,
            dtaDmpBak
          );
        }
        break;
      case 'btn-cancel':
        clearImputs();
        break;
    }
  };

  const handleDatabaseRegistration = async (
    structure,
    client,
    brands,
    server,
    instance,
    charset,
    dbUser,
    size,
    dtaDmpBak
  ) => {
    setIsLoading(true);
    await databaseRegistration(
      structure,
      client,
      brands,
      server,
      instance,
      charset,
      dbUser,
      size,
      dtaDmpBak
    )
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

  const handleDatabaseEdit = async (
    dbID,
    structure,
    client,
    brands,
    server,
    instance,
    charset,
    dbUser,
    size,
    dtaDmpBak
  ) => {
    setIsLoading(true);
    await databaseEdit(
      dbID,
      structure,
      client,
      brands,
      server,
      instance,
      charset,
      dbUser,
      size,
      dtaDmpBak
    )
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

  const hanldeDatabaseDelete = async (dbID) => {
    setIsLoading(true);
    await databaseDelete(dbID)
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

  return (
    <Fragment>
      <NavBar />
      <Sidebar />
      {isLoading ? (
        <div className="body_site row">
          <Loading />
          <div className="row">
            <span className="reg-title">Manutenção de Bases</span>
            <hr />
          </div>
          <div className="row">
            <div className="col-3">
              <div className="col-12">
                <DataRegistrationTable handleInsertData={handleInsertData} />
              </div>
            </div>
            <div className="registration col-7">
              <div className="reg-form col-12">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-3">
                      <div className="form-group form-group-registration mb-4">
                        <select
                          id="structure"
                          value={structure}
                          onChange={(e) => setStructure(e.target.value)}
                          placeholder="type"
                          className="form-select form-select-sm"
                        >
                          <option value="Oracle">Oracle</option>
                          <option value="SQL Server">SQL Server</option>
                        </select>
                        <label className="form-label form-label-registration">Banco de Dados</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="dtaDmpBak"
                          value={dtaDmpBak}
                          onChange={(e) => setDtaDmpBak(e.target.value)}
                          type="datetime"
                          placeholder="dtaDmpBak"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Data</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-7">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="client"
                          value={client}
                          onChange={(e) => setClient(e.target.value)}
                          type="text"
                          placeholder="client"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Cliente</label>
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="brands"
                          value={brands}
                          onChange={(e) => setBrands(e.target.value)}
                          type="text"
                          placeholder="marcas"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Marca</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="server"
                          value={server}
                          onChange={(e) => setServer(e.target.value)}
                          type="text"
                          placeholder="server"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Servidor</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="instance"
                          value={instance}
                          onChange={(e) => setInstance(e.target.value)}
                          type="text"
                          placeholder="instance"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Instância</label>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="charset"
                          value={charset}
                          onChange={(e) => setCharset(e.target.value)}
                          type="text"
                          placeholder="charset"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Charset</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="user"
                          value={dbUser}
                          onChange={(e) => setDbUser(e.target.value)}
                          type="text"
                          placeholder="usuario"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Usuário</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="size"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                          type="text"
                          placeholder="tamanho"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Tamanho (GBs)</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-2">
              <button id="btn-save" onClick={() => handleSubmit('btn-save')} className="buttons">
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
      ) : (
        <div className="body_site row">
          <div className="row">
            <span className="reg-title">Manutenção de Bases</span>
            <hr />
          </div>
          <div className="row">
            <div className="col-3">
              <div className="col-12">
                <DataRegistrationTable handleInsertData={handleInsertData} />
              </div>
            </div>
            <div className="registration col-7">
              <div className="reg-form col-12">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-3">
                      <div className="form-group form-group-registration mb-4">
                        <select
                          id="structure"
                          value={structure}
                          onChange={(e) => setStructure(e.target.value)}
                          placeholder="type"
                          className="form-select form-select-sm"
                        >
                          <option value="Oracle">Oracle</option>
                          <option value="SQL Server">SQL Server</option>
                        </select>
                        <label className="form-label form-label-registration">Banco de Dados</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="dtaDmpBak"
                          value={dtaDmpBak}
                          onChange={(e) => setDtaDmpBak(e.target.value)}
                          type="date"
                          placeholder="dtaDmpBak"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Data</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-7">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="client"
                          value={client}
                          onChange={(e) => setClient(e.target.value)}
                          type="text"
                          placeholder="client"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Cliente</label>
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="brands"
                          value={brands}
                          onChange={(e) => setBrands(e.target.value)}
                          type="text"
                          placeholder="marcas"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Marca</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <div className="form-group form-group-registration mb-4">
                        <select
                          id="structure"
                          value={server}
                          onChange={(e) => setServer(e.target.value)}
                          placeholder="type"
                          className="form-select form-select-sm"
                        >
                          <option value="0">Selecione</option>
                          <option value="BH - BHDSKFS0007909">BH - BHDSKFS0007909</option>
                          <option value="POA - POADSKFS044947">POA - POADSKFS044947</option>
                        </select>
                        <label className="form-label form-label-registration">Servidor</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="instance"
                          value={instance}
                          onChange={(e) => setInstance(e.target.value)}
                          type="text"
                          placeholder="instance"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Instância</label>
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="form-group form-group-registration mb-4">
                        <select
                          id="structure"
                          value={charset}
                          onChange={(e) => setCharset(e.target.value)}
                          placeholder="type"
                          className="form-select form-select-sm"
                        >
                          <option value="0">Selecione</option>
                          {structure == 'Oracle' ? (
                            <Fragment>
                              <option value="AL32UTF8">AL32UTF8</option>
                              <option value="EE8MSWIN1250">EE8MSWIN1250</option>
                              <option value="JA16SJISTILDE">JA16SJISTILDE</option>
                              <option value="US7ASCII">US7ASCII</option>
                              <option value="UTF8">UTF8</option>
                              <option value="WE8EBCDIC1047">WE8EBCDIC1047</option>
                              <option value="WE8ISO8859P1">WE8ISO8859P1</option>
                              <option value="WE8MSWIN1252">WE8EBCDIC1047</option>
                              <option value="ZHT16MSWIN950">ZHT16MSWIN950</option>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <option value="SQL_Latin1_General_CP1_CI_AS">
                                SQL_Latin1_General_CP1_CI_AS
                              </option>
                            </Fragment>
                          )}
                        </select>
                        <label className="form-label form-label-registration">
                          Conjunto de Caracteres
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="user"
                          value={dbUser}
                          onChange={(e) => setDbUser(e.target.value)}
                          type="text"
                          placeholder="usuario"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Usuário</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group form-group-registration mb-4">
                        <input
                          id="size"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                          type="text"
                          maxLength={3}
                          placeholder="tamanho"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">Tamanho (GBs)</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-2">
              {!dbID ? (
                <button id="btn-save" disabled className="buttons">
                  <BsCheckLg className="icon-button" />
                  Salvar
                </button>
              ) : (
                <button id="btn-save" onClick={() => handleSubmit('btn-save')} className="buttons">
                  <BsCheckLg className="icon-button" />
                  Salvar
                </button>
              )}
              {dbID ? (
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
              {!dbID ? (
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
              location="databases"
              hanldeDatabaseDelete={hanldeDatabaseDelete}
              idDel={dbID}
              nameDel={client}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default RegistrationDatabase;
