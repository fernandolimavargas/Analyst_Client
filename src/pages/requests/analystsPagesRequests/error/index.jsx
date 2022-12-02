import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../../../../components/navbar';
import Sidebar from '../../../../components/sidebar';
import Loading from '../../../../components/loading';
import Button from '../../../../components/button';
import RequestsTable from '../../../../components/table/requests';
import MovementsAnalyst from '../../../../components/requests/movements/analyst';
import InformationRequest from '../../../../components/informationRequest';

import { errorMessage, successMessage, warningMessage } from '../../../../components/messages';
import { addClassRowSelected } from '../../../registration/script';

import { testConnection, reqError, reqErrorMark, reqErrorInfRes } from '../../../../services/api';

import '../style.css';
import '../../../registration/script';

const AnalystRequestError = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [reqStatus, setReqStatus] = useState('');

  const [nroISSUE, setNroISSUE] = useState('N');
  const [action, setAction] = useState('');
  const [solution, setSolution] = useState('');

  const [yesNoPaliative, setYesNoPaliative] = useState('N');
  const [yesNoNote, setYesNoNote] = useState('N');
  const [structure, setStructure] = useState('SQL Server');
  const [userBD, setUserBD] = useState('CNP');
  const [idReq, setIdReq] = useState('');

  const [nroTp, setNroTp] = useState('');
  const [pathMenu, setPathMenu] = useState('');
  const [codMenu, setCodMenu] = useState('');
  const [making, setMaking] = useState('');
  const [make, setMake] = useState('');
  const [alternative, setAlternative] = useState('');
  const [note, setNote] = useState('');
  const [linkDocs, setLinkDocs] = useState('');
  const [server, setServer] = useState('');
  const [base, setBase] = useState('');
  const [version, setVersion] = useState([]);
  const [prevVersion, setPrevVersion] = useState('');

  const regNRO = new RegExp('^[0-9]+$');

  const handleInsertData = (data) => {
    addClassRowSelected(data.idError, '.rows-table-reqs');

    setIdReq(data.idError);
    setNroTp(data.nroTP);
    setPathMenu(data.pathMenu);
    setCodMenu(data.codMenu);
    setMake(data.make);
    setMaking(data.making);
    setPrevVersion(data.previousVersion);
    setAlternative(data.paliative);
    setNote(data.obs);
    setUserBD(data.userDb);
    setServer(data.server);
    setBase(data.dataBase);
    setLinkDocs(data.docs);
    setVersion(data.version);
    setSolution(data.solution);

    setReqStatus(data.status);
    setNroISSUE(data.issue);
    setStructure(data.typeDb);

    if (data.paliative == '') {
      setYesNoPaliative('N');
    } else {
      setYesNoPaliative('S');
    }

    if (data.obs == '') {
      setYesNoNote('N');
    } else {
      setYesNoNote('S');
    }
  };

  const handleSubmit = (idButton) => {
    switch (idButton) {
      case 'btn-insert':
        if (
          !nroTp ||
          !pathMenu ||
          !codMenu ||
          !making ||
          !make ||
          !linkDocs ||
          !structure ||
          !userBD ||
          !base ||
          !server ||
          version == '0' ||
          !prevVersion
        ) {
          warningMessage('Preencha todos os campos antes de enviar', 'Aviso');
        } else if (!regNRO.exec(nroTp)) {
          warningMessage('Só são permitidos números no campo "Número da TP"', 'Aviso');
        } else if (!regNRO.exec(codMenu)) {
          warningMessage('Só são permitidos números no campo "Código do Menu"', 'Aviso');
        } else if (yesNoPaliative == 'S' && !alternative) {
          warningMessage('Você marcou que tem paliativa, então descreva-a', 'Aviso');
        } else if (yesNoNote == 'S' && !note) {
          warningMessage('Você marcou que irá adicionar uma observação, então descreva-a', 'Aviso');
        } else {
          handleReqError(
            nroTp,
            pathMenu,
            codMenu,
            making,
            make,
            alternative,
            linkDocs,
            structure,
            userBD,
            base,
            server,
            version,
            prevVersion,
            note,
            false
          );
        }
        break;
      case 'btn-label':
        if (!regNRO.exec(nroISSUE)) {
          warningMessage('Só são permitidos números no campo "ISSUE"', 'Aviso');
        } else {
          handleReqErrorMark(idReq, nroISSUE);
        }
        break;
      case 'btn-test':
        handleTestConnection(structure, server, base, userBD, 'ninguemsabe');
        break;
    }
  };

  const handleReqErrorMark = async (idRequest, issue) => {
    setIsLoading(true);
    await reqErrorMark(idRequest, issue)
      .then((resp) => {
        successMessage(resp.data.message, 'Sucesso');
        setReqStatus('AGUARDANDO ADIÇÃO DE RÓTULO');
      })
      .catch((err) => {
        try {
          warningMessage(err.response.data.message, 'Aviso');
        } catch (err) {
          errorMessage('Status Desconhecido', 'Erro');
        }
      });
    setIsLoading(false);
  };

  const handleTestConnection = async (structure, server, database, username, password) => {
    setIsLoading(true);
    await testConnection(structure, server, database, username, password)
      .then((resp) => {
        successMessage(resp.data.message, 'Sucesso');
      })
      .catch((err) => {
        try {
          warningMessage(err.response.data.message, 'Aviso');
        } catch (err) {
          errorMessage('Status Desconhecido', 'Erro');
        }
      });
    setIsLoading(false);
  };

  const handleReqErrorInfRes = async (idRequest, message) => {
    if (message.length < 10) {
      warningMessage('A resposta deve ter pelo menos 10 caracteres', 'Aviso');
    } else {
      setIsLoading(true);
      await reqErrorInfRes(idRequest, message)
        .then((resp) => {
          successMessage(resp.data.message, 'Sucesso');
          setReqStatus('EM ANALISE');
        })
        .catch((err) => {
          try {
            warningMessage(err.response.data.message, 'Aviso');
          } catch (err) {
            errorMessage('Status Desconhecido', 'Erro');
          }
        });
      setIsLoading(false);
    }
  };

  const handleReqError = async (
    nroTp,
    pathMenu,
    codMenu,
    making,
    make,
    alternative,
    linkDocs,
    structure,
    userBD,
    base,
    server,
    version,
    prevVersion,
    note,
    duplicate
  ) => {
    setIsLoading(true);
    await reqError(
      nroTp,
      pathMenu,
      codMenu,
      making,
      make,
      alternative,
      linkDocs,
      structure,
      userBD,
      base,
      server,
      version,
      prevVersion,
      note,
      duplicate
    )
      .then((resp) => {
        successMessage(resp.data.message, 'Sucesso');
      })
      .catch((err) => {
        try {
          warningMessage(err.response.data.message, 'Aviso');
        } catch (err) {
          errorMessage('Status Desconhecido', 'Erro');
        }
      });
    setIsLoading(false);
  };

  return (
    <Fragment>
      <NavBar />
      <Sidebar />
      {isLoading ? (
        <Fragment>
          <div className="body_site row">
            <Loading />
            <div className="row">
              <span className="list-title">Solicitação de Análise de BUG</span>
              <hr />
              <div className="col-3">
                <div>
                  <RequestsTable handleInsertData={handleInsertData} />
                </div>
              </div>
              <div className="registration col-9">
                <div className="col-12">
                  <div className="row">
                    <div className="reg-form col-9">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-3">
                            <div className="form-group form-group-registration mb-4">
                              <input
                                id="numberTP"
                                type="text"
                                value={nroTp}
                                onChange={(e) => setNroTp(e.target.value)}
                                placeholder="numberTP"
                                className="form-control form-control-sm form-input"
                              />
                              <label className="form-label form-label-registration">
                                Número da TP
                              </label>
                            </div>
                          </div>
                          {(reqStatus == 'AGUARDANDO ABERTURA DE ISSUE' || nroISSUE != 'N') && (
                            <div className="col-3">
                              <div className="form-group form-group-registration mb-4">
                                <input
                                  id="numberISSUE"
                                  type="text"
                                  value={nroISSUE}
                                  onChange={(e) => setNroISSUE(e.target.value)}
                                  placeholder="numberISSUE"
                                  className="form-control form-control-sm form-input"
                                />
                                <label className="form-label form-label-registration">ISSUE</label>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-9">
                            <div className="form-group form-group-registration mb-4">
                              <input
                                id="pathMenu"
                                type="text"
                                value={pathMenu}
                                onChange={(e) => setPathMenu(e.target.value)}
                                placeholder="pathMenu"
                                className="form-control form-control-sm form-input"
                              />
                              <label className="form-label form-label-registration">
                                Caminho Menu
                              </label>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group form-group-registration mb-4">
                              <input
                                id="codMenu"
                                type="text"
                                value={codMenu}
                                onChange={(e) => setCodMenu(e.target.value)}
                                placeholder="codMenu"
                                className="form-control form-control-sm form-input"
                              />
                              <label className="form-label form-label-registration">
                                Código Menu
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group form-group-registration mb-4">
                          <textarea
                            id="making"
                            type="text"
                            value={making}
                            onChange={(e) => setMaking(e.target.value)}
                            placeholder="making"
                            className="form-control form-control-sm form-input"
                          />
                          <label className="form-label form-label-registration">
                            O que o sistema está fazendo?
                          </label>
                        </div>
                        <div className="form-group form-group-registration mb-2">
                          <textarea
                            id="make"
                            type="text"
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                            placeholder="make"
                            className="form-control form-control-sm form-input"
                          />
                          <label className="form-label form-label-registration">
                            O que o sistema deveria fazer?
                          </label>
                        </div>
                        <div className="form-check form-check-inline form-radio">
                          <label htmlFor="radio-input" className="form-check-label">
                            Tem Paliativa?
                          </label>
                        </div>
                        <div className="form-check form-check-inline form-radio">
                          <input
                            name="radio-paliative"
                            value={yesNoPaliative}
                            checked={yesNoPaliative == 'S'}
                            onChange={() => setYesNoPaliative('S')}
                            type="radio"
                            className="form-check-input"
                          />
                          <label htmlFor="radio-input" className="form-check-label">
                            Sim
                          </label>
                        </div>
                        <div className="form-check form-check-inline form-radio">
                          <input
                            name="radio-paliative"
                            value={yesNoPaliative}
                            checked={yesNoPaliative == 'N'}
                            onChange={() => setYesNoPaliative('N')}
                            type="radio"
                            className="form-check-input"
                          />
                          <label htmlFor="radio-input" className="form-check-label">
                            Não
                          </label>
                        </div>
                        <div className="form-check form-check-inline form-radio">
                          <label htmlFor="radio-input" className="form-check-label">
                            Adicionar Observação/Inf. Adicional?
                          </label>
                        </div>
                        <div className="form-check form-check-inline form-radio">
                          <input
                            name="radio-note"
                            value={yesNoNote}
                            checked={yesNoNote == 'S'}
                            onChange={() => setYesNoNote('S')}
                            type="radio"
                            className="form-check-input"
                          />
                          <label htmlFor="radio-input" className="form-check-label">
                            Sim
                          </label>
                        </div>
                        <div className="form-check form-check-inline form-radio mb-2">
                          <input
                            name="radio-note"
                            value={yesNoNote}
                            checked={yesNoNote == 'N'}
                            onChange={() => setYesNoNote('N')}
                            type="radio"
                            className="form-check-input"
                          />
                          <label htmlFor="radio-input" className="form-check-label">
                            Não
                          </label>
                        </div>
                        {yesNoPaliative == 'S' && (
                          <div className="form-group form-group-registration mb-4">
                            <textarea
                              id="paliative"
                              type="text"
                              value={alternative}
                              onChange={(e) => setAlternative(e.target.value)}
                              placeholder="paliative"
                              className="form-control form-control-sm form-input"
                            />
                            <label className="form-label form-label-registration">Paliativa</label>
                          </div>
                        )}
                        {yesNoNote == 'S' && (
                          <div className="form-group form-group-registration mb-4">
                            <textarea
                              id="note"
                              type="text"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                              placeholder="note"
                              className="form-control form-control-sm form-input"
                            />
                            <label className="form-label form-label-registration">
                              Observação/Inf. Adicional
                            </label>
                          </div>
                        )}
                        <div className="roles-password">
                          <fieldset className="border field-roles p-3 mb-3">
                            <legend className="float-none w-auto">Banco de Dados</legend>
                            <div className="row">
                              <div className="col-3 mb-3">
                                <div className="form-group">
                                  <select
                                    id="structure"
                                    placeholder="type"
                                    value={structure}
                                    onChange={(e) => setStructure(e.target.value)}
                                    className="form-select form-select-sm"
                                  >
                                    <option value="SQL Server">SQL Server</option>
                                    <option value="Oracle">Oracle</option>
                                  </select>
                                  <label className="form-label form-label-registration">Tipo</label>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-check form-check-inline form-radio">
                                  <label htmlFor="radio-input" className="form-check-label">
                                    Versão Anterior?
                                  </label>
                                </div>
                                <div className="form-check form-check-inline form-radio">
                                  <input
                                    name="radio-version"
                                    value={prevVersion}
                                    checked={prevVersion == 'S'}
                                    onChange={() => setPrevVersion('S')}
                                    type="radio"
                                    className="form-check-input"
                                  />
                                  <label htmlFor="radio-input" className="form-check-label">
                                    Sim
                                  </label>
                                </div>
                                <div className="form-check form-check-inline form-radio mb-2">
                                  <input
                                    name="radio-version"
                                    value={prevVersion}
                                    checked={prevVersion == 'N'}
                                    onChange={() => setPrevVersion('N')}
                                    type="radio"
                                    className="form-check-input"
                                  />
                                  <label htmlFor="radio-input" className="form-check-label">
                                    Não
                                  </label>
                                </div>
                              </div>
                              <div className="col-3">
                                <div className="form-group">
                                  <select
                                    id="version"
                                    placeholder="type"
                                    value={version}
                                    onChange={(e) => setVersion(e.target.value)}
                                    className="form-select form-select-sm"
                                  >
                                    <option value="0">Selecione</option>
                                    <option value="5.09">5.09</option>
                                    <option value="5.08">5.08</option>
                                    <option value="5.07">5.07</option>
                                    <option value="5.06">5.06</option>
                                    <option value="5.05">5.05</option>
                                  </select>
                                  <label className="form-label form-label-registration">
                                    Versão Cliente
                                  </label>
                                </div>
                              </div>
                            </div>
                            {structure == 'Oracle' ? (
                              <Fragment>
                                <div className="row">
                                  <div className="col-3">
                                    <div className="form-group form-group-registration">
                                      <input
                                        id="instance"
                                        type="text"
                                        value={userBD}
                                        onChange={(e) => setUserBD(e.target.value)}
                                        placeholder="instance"
                                        className="form-control form-control-sm form-input"
                                      />
                                      <label className="form-label form-label-registration">
                                        Usuário
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group form-group-registration">
                                      <input
                                        id="server"
                                        type="text"
                                        value={server}
                                        onChange={(e) => setServer(e.target.value)}
                                        placeholder="server"
                                        className="form-control form-control-sm form-input"
                                      />
                                      <label className="form-label form-label-registration">
                                        Servidor
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-3">
                                    <div className="form-group form-group-registration">
                                      <input
                                        id="instance"
                                        type="text"
                                        value={base}
                                        onChange={(e) => setBase(e.target.value)}
                                        placeholder="instance"
                                        className="form-control form-control-sm form-input"
                                      />
                                      <label className="form-label form-label-registration">
                                        Instância
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </Fragment>
                            ) : (
                              <Fragment>
                                <div className="row">
                                  <div className="col-5">
                                    <div className="form-group form-group-registration">
                                      <input
                                        id="server"
                                        type="text"
                                        value={server}
                                        onChange={(e) => setServer(e.target.value)}
                                        placeholder="server"
                                        className="form-control form-control-sm form-input"
                                      />
                                      <label className="form-label form-label-registration">
                                        Servidor
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="form-group form-group-registration">
                                      <input
                                        id="instance"
                                        type="text"
                                        value={base}
                                        onChange={(e) => setBase(e.target.value)}
                                        placeholder="instance"
                                        className="form-control form-control-sm form-input"
                                      />
                                      <label className="form-label form-label-registration">
                                        Banco
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </Fragment>
                            )}
                          </fieldset>
                        </div>
                        <div>
                          <div className="form-group form-group-registration mb-3">
                            <input
                              id="evidences"
                              type="text"
                              value={linkDocs}
                              onChange={(e) => setLinkDocs(e.target.value)}
                              placeholder="evidences"
                              className="form-control form-control-sm form-input"
                            />
                            <label className="form-label form-label-registration">Evidências</label>
                          </div>
                        </div>
                        {reqStatus == 'FINALIZADA' && (
                          <div className="form-group form-group-registration">
                            <textarea
                              id="make"
                              type="text"
                              value={solution}
                              onChange={(e) => setSolution(e.target.value)}
                              placeholder="make"
                              className="form-control form-control-sm form-input"
                            />
                            <label className="form-label form-label-registration">Conclusão</label>
                          </div>
                        )}
                        {reqStatus == 'NÃO APROVADO' && (
                          <div className="form-group form-group-registration">
                            <textarea
                              id="make"
                              type="text"
                              value={solution}
                              onChange={(e) => setSolution(e.target.value)}
                              placeholder="make"
                              className="form-control form-control-sm form-input"
                            />
                            <label className="form-label form-label-registration">Conclusão</label>
                          </div>
                        )}
                      </form>
                    </div>
                    <div className="col-3">
                      {!nroISSUE || nroISSUE == 'N' ? (
                        <Button name="Issue Jira" disabled />
                      ) : (
                        <Button name="Issue Jira" nroIssue={nroISSUE} />
                      )}
                      {idReq ? (
                        <Button name="Solicitar" disabled />
                      ) : (
                        <Button name="Solicitar" submit={() => handleSubmit('btn-insert')} />
                      )}
                      {reqStatus != 'AGUARDANDO ABERTURA DE ISSUE' ? (
                        <Button name="Solicitar Rótulo" disabled />
                      ) : (
                        <Button name="Solicitar Rótulo" submit={() => handleSubmit('btn-label')} />
                      )}
                      {!idReq ? (
                        <Button name="Movimentações" disabled />
                      ) : (
                        <Button name="Movimentações" dataTarget="#modal-movements" />
                      )}
                      {reqStatus != 'AGUARDANDO INFORMAÇÃO' ? (
                        <Button name="Responder" disabled />
                      ) : (
                        <Button
                          name="Responder"
                          submit={() => setAction('answer')}
                          dataTarget="#modal-information-request"
                        />
                      )}
                      <Button name="Limpar Campos" submit={() => location.reload()} />
                      <Button name="Voltar" submit={() => navigate('/dashboard')} />
                    </div>
                    <MovementsAnalyst idReq={idReq} />
                    <InformationRequest
                      typeReq="error"
                      idReq={idReq}
                      action={action}
                      handleReqErrorInfRes={handleReqErrorInfRes}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="body_site row">
          <div className="row">
            <span className="list-title">Solicitação de Análise de BUG</span>
            <hr />
            <div className="col-3">
              <div>
                <RequestsTable handleInsertData={handleInsertData} isLoading={isLoading} />
              </div>
            </div>
            <div className="registration col-9">
              <div className="col-12">
                <div className="row">
                  <div className="reg-form col-9">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-3">
                          <div className="form-group form-group-registration mb-4">
                            <input
                              id="numberTP"
                              type="text"
                              value={nroTp}
                              onChange={(e) => setNroTp(e.target.value)}
                              placeholder="numberTP"
                              className="form-control form-control-sm form-input"
                            />
                            <label className="form-label form-label-registration">
                              Número da TP
                            </label>
                          </div>
                        </div>
                        {(reqStatus == 'AGUARDANDO ABERTURA DE ISSUE' || nroISSUE != 'N') && (
                          <div className="col-3">
                            <div className="form-group form-group-registration mb-4">
                              <input
                                id="numberISSUE"
                                type="text"
                                value={nroISSUE}
                                onChange={(e) => setNroISSUE(e.target.value)}
                                placeholder="numberISSUE"
                                className="form-control form-control-sm form-input"
                              />
                              <label className="form-label form-label-registration">ISSUE</label>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-9">
                          <div className="form-group form-group-registration mb-4">
                            <input
                              id="pathMenu"
                              type="text"
                              value={pathMenu}
                              onChange={(e) => setPathMenu(e.target.value)}
                              placeholder="pathMenu"
                              className="form-control form-control-sm form-input"
                            />
                            <label className="form-label form-label-registration">
                              Caminho Menu
                            </label>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="form-group form-group-registration mb-4">
                            <input
                              id="codMenu"
                              type="text"
                              value={codMenu}
                              onChange={(e) => setCodMenu(e.target.value)}
                              placeholder="codMenu"
                              className="form-control form-control-sm form-input"
                            />
                            <label className="form-label form-label-registration">
                              Código Menu
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group form-group-registration mb-4">
                        <textarea
                          id="making"
                          type="text"
                          value={making}
                          onChange={(e) => setMaking(e.target.value)}
                          placeholder="making"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">
                          O que o sistema está fazendo?
                        </label>
                      </div>
                      <div className="form-group form-group-registration mb-2">
                        <textarea
                          id="make"
                          type="text"
                          value={make}
                          onChange={(e) => setMake(e.target.value)}
                          placeholder="make"
                          className="form-control form-control-sm form-input"
                        />
                        <label className="form-label form-label-registration">
                          O que o sistema deveria fazer?
                        </label>
                      </div>
                      <div className="form-check form-check-inline form-radio">
                        <label htmlFor="radio-input" className="form-check-label">
                          Tem Paliativa?
                        </label>
                      </div>
                      <div className="form-check form-check-inline form-radio">
                        <input
                          name="radio-paliative"
                          value={yesNoPaliative}
                          checked={yesNoPaliative == 'S'}
                          onChange={() => setYesNoPaliative('S')}
                          type="radio"
                          className="form-check-input"
                        />
                        <label htmlFor="radio-input" className="form-check-label">
                          Sim
                        </label>
                      </div>
                      <div className="form-check form-check-inline form-radio">
                        <input
                          name="radio-paliative"
                          value={yesNoPaliative}
                          checked={yesNoPaliative == 'N'}
                          onChange={() => setYesNoPaliative('N')}
                          type="radio"
                          className="form-check-input"
                        />
                        <label htmlFor="radio-input" className="form-check-label">
                          Não
                        </label>
                      </div>
                      <div className="form-check form-check-inline form-radio">
                        <label htmlFor="radio-input" className="form-check-label">
                          Adicionar Observação/Inf. Adicional?
                        </label>
                      </div>
                      <div className="form-check form-check-inline form-radio">
                        <input
                          name="radio-note"
                          value={yesNoNote}
                          checked={yesNoNote == 'S'}
                          onChange={() => setYesNoNote('S')}
                          type="radio"
                          className="form-check-input"
                        />
                        <label htmlFor="radio-input" className="form-check-label">
                          Sim
                        </label>
                      </div>
                      <div className="form-check form-check-inline form-radio mb-2">
                        <input
                          name="radio-note"
                          value={yesNoNote}
                          checked={yesNoNote == 'N'}
                          onChange={() => setYesNoNote('N')}
                          type="radio"
                          className="form-check-input"
                        />
                        <label htmlFor="radio-input" className="form-check-label">
                          Não
                        </label>
                      </div>
                      {yesNoPaliative == 'S' && (
                        <div className="form-group form-group-registration mb-4">
                          <textarea
                            id="paliative"
                            type="text"
                            value={alternative}
                            onChange={(e) => setAlternative(e.target.value)}
                            placeholder="paliative"
                            className="form-control form-control-sm form-input"
                          />
                          <label className="form-label form-label-registration">Paliativa</label>
                        </div>
                      )}
                      {yesNoNote == 'S' && (
                        <div className="form-group form-group-registration mb-4">
                          <textarea
                            id="note"
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="note"
                            className="form-control form-control-sm form-input"
                          />
                          <label className="form-label form-label-registration">
                            Observação/Inf. Adicional
                          </label>
                        </div>
                      )}
                      <div className="roles-password">
                        <fieldset className="border field-roles p-3 mb-3">
                          <legend className="float-none w-auto">Banco de Dados</legend>
                          <div className="row">
                            <div className="col-3 mb-3">
                              <div className="form-group">
                                <select
                                  id="structure"
                                  placeholder="type"
                                  value={structure}
                                  onChange={(e) => setStructure(e.target.value)}
                                  className="form-select form-select-sm"
                                >
                                  <option value="SQL Server">SQL Server</option>
                                  <option value="Oracle">Oracle</option>
                                </select>
                                <label className="form-label form-label-registration">Tipo</label>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="form-check form-check-inline form-radio">
                                <label htmlFor="radio-input" className="form-check-label">
                                  Versão Anterior?
                                </label>
                              </div>
                              <div className="form-check form-check-inline form-radio">
                                <input
                                  name="radio-version"
                                  value={prevVersion}
                                  checked={prevVersion == 'S'}
                                  onChange={() => setPrevVersion('S')}
                                  type="radio"
                                  className="form-check-input"
                                />
                                <label htmlFor="radio-input" className="form-check-label">
                                  Sim
                                </label>
                              </div>
                              <div className="form-check form-check-inline form-radio mb-2">
                                <input
                                  name="radio-version"
                                  value={prevVersion}
                                  checked={prevVersion == 'N'}
                                  onChange={() => setPrevVersion('N')}
                                  type="radio"
                                  className="form-check-input"
                                />
                                <label htmlFor="radio-input" className="form-check-label">
                                  Não
                                </label>
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="form-group">
                                <select
                                  id="version"
                                  placeholder="type"
                                  value={version}
                                  onChange={(e) => setVersion(e.target.value)}
                                  className="form-select form-select-sm"
                                >
                                  <option value="0">Selecione</option>
                                  <option value="5.09">5.09</option>
                                  <option value="5.08">5.08</option>
                                  <option value="5.07">5.07</option>
                                  <option value="5.06">5.06</option>
                                  <option value="5.05">5.05</option>
                                </select>
                                <label className="form-label form-label-registration">
                                  Versão Cliente
                                </label>
                              </div>
                            </div>
                          </div>
                          {structure == 'Oracle' ? (
                            <Fragment>
                              <div className="row">
                                <div className="col-3">
                                  <div className="form-group form-group-registration">
                                    <input
                                      id="instance"
                                      type="text"
                                      value={userBD}
                                      onChange={(e) => setUserBD(e.target.value)}
                                      placeholder="instance"
                                      className="form-control form-control-sm form-input"
                                    />
                                    <label className="form-label form-label-registration">
                                      Usuário
                                    </label>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group form-group-registration">
                                    <input
                                      id="server"
                                      type="text"
                                      value={server}
                                      onChange={(e) => setServer(e.target.value)}
                                      placeholder="server"
                                      className="form-control form-control-sm form-input"
                                    />
                                    <label className="form-label form-label-registration">
                                      Servidor
                                    </label>
                                  </div>
                                </div>
                                <div className="col-3">
                                  <div className="form-group form-group-registration">
                                    <input
                                      id="instance"
                                      type="text"
                                      value={base}
                                      onChange={(e) => setBase(e.target.value)}
                                      placeholder="instance"
                                      className="form-control form-control-sm form-input"
                                    />
                                    <label className="form-label form-label-registration">
                                      Instância
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <div className="row">
                                <div className="col-5">
                                  <div className="form-group form-group-registration">
                                    <input
                                      id="server"
                                      type="text"
                                      value={server}
                                      onChange={(e) => setServer(e.target.value)}
                                      placeholder="server"
                                      className="form-control form-control-sm form-input"
                                    />
                                    <label className="form-label form-label-registration">
                                      Servidor
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="form-group form-group-registration">
                                    <input
                                      id="instance"
                                      type="text"
                                      value={base}
                                      onChange={(e) => setBase(e.target.value)}
                                      placeholder="instance"
                                      className="form-control form-control-sm form-input"
                                    />
                                    <label className="form-label form-label-registration">
                                      Banco
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          )}
                        </fieldset>
                      </div>
                      <div>
                        <div className="form-group form-group-registration mb-3">
                          <input
                            id="evidences"
                            type="text"
                            value={linkDocs}
                            onChange={(e) => setLinkDocs(e.target.value)}
                            placeholder="evidences"
                            className="form-control form-control-sm form-input"
                          />
                          <label className="form-label form-label-registration">Evidências</label>
                        </div>
                      </div>
                      {reqStatus == 'FINALIZADA' && (
                        <div className="form-group form-group-registration">
                          <textarea
                            id="make"
                            type="text"
                            value={solution}
                            onChange={(e) => setSolution(e.target.value)}
                            placeholder="make"
                            className="form-control form-control-sm form-input"
                          />
                          <label className="form-label form-label-registration">Conclusão</label>
                        </div>
                      )}
                      {reqStatus == 'NÃO APROVADO' && (
                        <div className="form-group form-group-registration">
                          <textarea
                            id="make"
                            type="text"
                            value={solution}
                            onChange={(e) => setSolution(e.target.value)}
                            placeholder="make"
                            className="form-control form-control-sm form-input"
                          />
                          <label className="form-label form-label-registration">Conclusão</label>
                        </div>
                      )}
                    </form>
                  </div>
                  <div className="col-3">
                    {!nroISSUE || nroISSUE == 'N' ? (
                      <Button name="Issue Jira" disabled />
                    ) : (
                      <Button name="Issue Jira" nroIssue={nroISSUE} />
                    )}
                    {idReq ? (
                      <Button name="Solicitar" disabled />
                    ) : (
                      <Button name="Solicitar" submit={() => handleSubmit('btn-insert')} />
                    )}
                    {reqStatus != 'AGUARDANDO ABERTURA DE ISSUE' ? (
                      <Button name="Solicitar Rótulo" disabled />
                    ) : (
                      <Button name="Solicitar Rótulo" submit={() => handleSubmit('btn-label')} />
                    )}
                    {!idReq ? (
                      <Button name="Movimentações" disabled />
                    ) : (
                      <Button name="Movimentações" dataTarget="#modal-movements" />
                    )}
                    {reqStatus != 'AGUARDANDO INFORMAÇÃO' ? (
                      <Button name="Responder" disabled />
                    ) : (
                      <Button
                        name="Responder"
                        submit={() => setAction('answer')}
                        dataTarget="#modal-information-request"
                      />
                    )}
                    <Button name="Limpar Campos" submit={() => location.reload()} />
                    <Button name="Voltar" submit={() => navigate('/dashboard')} />
                  </div>
                  <MovementsAnalyst idReq={idReq} />
                  <InformationRequest
                    typeReq="error"
                    idReq={idReq}
                    action={action}
                    handleReqErrorInfRes={handleReqErrorInfRes}
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

export default AnalystRequestError;
