import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../../../../../contexts/global';
import Button from '../../../../../components/button';
import Loading from '../../../../../components/loading';
import MovementsHelper from '../../../../../components/requests/movements/helper';
import NavBar from '../../../../../components/navbar';
import Sidebar from '../../../../../components/sidebar';
import InformationRequest from '../../../../../components/informationRequest';

import { successMessage, warningMessage, errorMessage } from '../../../../../components/messages';
import {
  reqErrorAproved,
  reqErrorStart,
  reqErrorInf,
  reqErrorList,
  reqErrorFinished,
  reqErrorRecused,
  reqErrorReopen,
  reqErrorEdit,
  reqErrorRefer,
} from '../../../../../services/api';

const PublishSol = () => {
  const navigate = useNavigate();
  const { request } = useContext(GlobalContext);

  const [loading, setIsLoading] = useState(false);

  const [yesNoPaliative, setYesNoPaliative] = useState('');
  const [yesNoNote, setYesNoNote] = useState('');
  const [structure, setStructure] = useState('');
  const [userBD, setUserBD] = useState('');
  const [idReq, setIdReq] = useState('');
  const [reqStatus, setReqStatus] = useState('');
  const [nroISSUE, setNroISSUE] = useState('N');
  const [helperID, setHelperID] = useState('');

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
  const [version, setVersion] = useState('');
  const [prevVersion, setPrevVersion] = useState('');
  const [solution, setSolution] = useState('');

  const [message, setMessage] = useState('');
  const [action, setAction] = useState('');

  const handleInsertData = (data) => {
    setIdReq(data.idError);
    setNroTp(data.nroTP);
    setNroISSUE(data.issue);
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
    setReqStatus(data.status);
    setStructure(data.typeDb);
    setSolution(data.solution);
    setHelperID(data.helperID);

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

  const regNRO = new RegExp('^[0-9]+$');

  const handleSubmit = (idButton) => {
    switch (idButton) {
      case 'btn-start':
        handleReqErrorStart(idReq);
        break;
      case 'btn-edit':
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
          handleReqErrorEdit(
            idReq,
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
            note
          );
        }
        break;
    }
  };

  useEffect(() => {
    if (request == undefined) {
      reqErrorList(localStorage.getItem('IdReq')).then((resp) => {
        handleInsertData(resp.data[0]);
      });
    } else {
      reqErrorList(request).then((resp) => {
        handleInsertData(resp.data[0]);
      });
    }
  }, [loading, request]);

  const handleReqErrorStart = async (idReq) => {
    setIsLoading(true);
    await reqErrorStart(idReq)
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

  const handleReqErrorRefer = async (idReq, helperID) => {
    setIsLoading(true);
    await reqErrorRefer(idReq, helperID)
      .then((resp) => {
        successMessage(resp.data.message, 'Sucesso');
        navigate('/request/helper/error/');
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

  const handleReqErrorEdit = async (
    idReq,
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
    note
  ) => {
    setIsLoading(true);
    await reqErrorEdit(
      idReq,
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
      note
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

  const handleReqErrorInf = async (idReq, message) => {
    if (message.length < 10) {
      warningMessage('A solicitação deve ter pelo menos 10 caracteres', 'Aviso');
    } else {
      setIsLoading(true);
      await reqErrorInf(idReq, message)
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
    }
  };

  const handleReqErrorAproved = async (idReq, message) => {
    setIsLoading(true);
    await reqErrorAproved(idReq, message)
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
  reqErrorRecused;

  const handleReqErrorRecused = async (idReq, message) => {
    if (message.length < 15) {
      warningMessage('A conclusão deve ter pelo menos 15 caracteres', 'Aviso');
    } else {
      setIsLoading(true);
      await reqErrorRecused(idReq, message)
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
    }
  };

  const handleReqErrorReopen = async (idReq, message) => {
    setIsLoading(true);
    await reqErrorReopen(idReq, message)
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

  const handleReqErrorFinished = async (idReq, message) => {
    if (message.length < 15) {
      warningMessage('A conclusão deve ter pelo menos 15 caracteres', 'Aviso');
    } else {
      setIsLoading(true);
      await reqErrorFinished(idReq, message)
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
    }
  };

  const backToListing = () => {
    localStorage.removeItem('IdReq');
    navigate('/request/helper/error/');
  };

  return (
    <Fragment>
      <NavBar />
      <Sidebar />
      {loading ? (
        <div className="body_site row">
          <Loading />
          <div className="row">
            <span className="list-title">Manutenção de Solicitações de Análise de Erros</span>
            <hr />
          </div>
          <div className="row">
            <div className="col-3">
              <MovementsHelper idReq={idReq} />
            </div>
            <div className="registration col-9">
              <div className="col-12">
                <div className="row">
                  <div className="reg-form col-9">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="form-group form-group-registration mb-4 col-3">
                          <input
                            id="numberTP"
                            type="text"
                            value={nroTp}
                            onChange={(e) => setNroTp(e.target.value)}
                            placeholder="numberTP"
                            className="form-control form-control-sm form-input"
                          />
                          <label className="form-label form-label-registration">Número da TP</label>
                        </div>
                        {nroISSUE != 'N' && (
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
                        <div className="form-group form-group-registration mb-4">
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
                      {reqStatus == 'FINALIZADA' ||
                        (reqStatus == 'NÃO APROVADO' && (
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
                        ))}
                    </form>
                  </div>
                  <div className="col-3">
                    {!nroISSUE || nroISSUE == 'N' ? (
                      <Button name="Issue Jira" disabled />
                    ) : (
                      <Button name="Issue Jira" nroIssue={nroISSUE} />
                    )}
                    {reqStatus != 'NÃO INICIADO' ? (
                      <Button name="Iniciar" disabled />
                    ) : (
                      <Button name="Iniciar" submit={() => handleSubmit('btn-start')} />
                    )}
                    {reqStatus != 'EM ANALISE' ? (
                      <Button name="Encaminhar" disabled />
                    ) : (
                      <Button name="Encaminhar" />
                    )}
                    {reqStatus != 'EM ANALISE' ? (
                      <Button name="Editar" disabled />
                    ) : (
                      <Button name="Editar" />
                    )}
                    {reqStatus != 'EM ANALISE' ? (
                      <Button name="Solicitar Info" disabled />
                    ) : (
                      <Button
                        name="Solicitar Info"
                        submit={() => setAction('question')}
                        dataTarget="#modal-information-request"
                      />
                    )}
                    {reqStatus != 'EM ANALISE' ? (
                      <Button name="Recusar" disabled />
                    ) : (
                      <Button
                        name="Recusar"
                        submit={() => setAction('reprove')}
                        dataTarget="#modal-information-request"
                      />
                    )}
                    {reqStatus != 'EM ANALISE' ? (
                      <Button name="Aprovar" disabled />
                    ) : (
                      <Button name="Aprovar" submit={() => handleSubmit('btn-aprove')} />
                    )}
                    {reqStatus != 'AGUARDANDO ADIÇÃO DE RÓTULO' ? (
                      <Button name="Finalizar" disabled />
                    ) : (
                      <Button
                        name="Finalizar"
                        submit={() => setAction('finalize')}
                        dataTarget="#modal-information-request"
                      />
                    )}
                    {reqStatus != 'FINALIZADA' ? (
                      <Fragment>
                        {reqStatus != 'NÃO APROVADO' ? (
                          <Button name="Reabrir" disabled />
                        ) : (
                          <Button
                            name="Reabrir"
                            submit={() => setAction('reopen')}
                            dataTarget="#modal-information-request"
                          />
                        )}
                      </Fragment>
                    ) : (
                      <Button
                        name="Reabrir"
                        submit={() => setAction('reopen')}
                        dataTarget="#modal-information-request"
                      />
                    )}
                    <Button name="Voltar" submit={() => navigate('/request/helper/error/')} />
                  </div>
                  <InformationRequest
                    idReq={idReq}
                    typeReq="error"
                    action={action}
                    handleReqErrorInf={handleReqErrorInf}
                    handleReqErrorFinished={handleReqErrorFinished}
                    handleReqErrorRecused={handleReqErrorRecused}
                    handleReqErrorReopen={handleReqErrorReopen}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="body_site row">
          <div className="row">
            <span className="list-title">Manutenção de Solicitações de Análise de Erros</span>
            <hr />
          </div>
          <div className="row">
            <div className="col-3">
              <MovementsHelper idReq={request} loading={loading} />
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
                        {nroISSUE != 'N' && (
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
                        <div className="form-group form-group-registration mb-4">
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
                    {reqStatus != 'NÃO INICIADO' ? (
                      <Button name="Iniciar" disabled />
                    ) : (
                      <Button name="Iniciar" submit={() => handleSubmit('btn-start')} />
                    )}
                    {reqStatus != 'EM ANALISE' ? (
                      <Button name="Encaminhar" disabled />
                    ) : (
                      <Button
                        name="Encaminhar"
                        submit={() => setAction('forwards')}
                        dataTarget="#modal-information-request"
                      />
                    )}
                    {reqStatus != 'EM ANALISE' ? (
                      <Button name="Editar" disabled />
                    ) : (
                      <Button name="Editar" submit={() => handleSubmit('btn-edit')} />
                    )}
                    {reqStatus != 'EM ANALISE' ? (
                      <Button name="Solicitar Info" disabled />
                    ) : (
                      <Button
                        name="Solicitar Info"
                        submit={() => setAction('question')}
                        dataTarget="#modal-information-request"
                      />
                    )}
                    {reqStatus != 'EM ANALISE' ? (
                      <Button name="Recusar" disabled />
                    ) : (
                      <Button
                        name="Recusar"
                        submit={() => setAction('reprove')}
                        dataTarget="#modal-information-request"
                      />
                    )}
                    {reqStatus != 'EM ANALISE' ? (
                      <Button name="Aprovar" disabled />
                    ) : (
                      <Button
                        name="Aprovar"
                        submit={() => setAction('aproved')}
                        dataTarget="#modal-information-request"
                      />
                    )}
                    {reqStatus != 'AGUARDANDO ADIÇÃO DE RÓTULO' ? (
                      <Button name="Finalizar" disabled />
                    ) : (
                      <Button
                        name="Finalizar"
                        submit={() => setAction('finalize')}
                        dataTarget="#modal-information-request"
                      />
                    )}
                    {reqStatus != 'FINALIZADA' ? (
                      <Fragment>
                        {reqStatus != 'NÃO APROVADO' ? (
                          <Button name="Reabrir" disabled />
                        ) : (
                          <Button
                            name="Reabrir"
                            submit={() => setAction('reopen')}
                            dataTarget="#modal-information-request"
                          />
                        )}
                      </Fragment>
                    ) : (
                      <Button
                        name="Reabrir"
                        submit={() => setAction('reopen')}
                        dataTarget="#modal-information-request"
                      />
                    )}
                    <Button name="Voltar" submit={() => backToListing()} />
                  </div>
                  <InformationRequest
                    idReq={idReq}
                    typeReq="error"
                    action={action}
                    helperID={helperID}
                    handleReqErrorAproved={handleReqErrorAproved}
                    handleReqErrorInf={handleReqErrorInf}
                    handleReqErrorFinished={handleReqErrorFinished}
                    handleReqErrorRecused={handleReqErrorRecused}
                    handleReqErrorReopen={handleReqErrorReopen}
                    handleReqErrorRefer={handleReqErrorRefer}
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

export default PublishSol;
