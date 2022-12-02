import React, { Fragment, useState } from 'react';

import { BsCheckLg } from 'react-icons/bs';
import { BiPlusMedical } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';

import { warningMessage, successMessage, errorMessage } from '../../../../components/messages';
import Loading from '../../../../components/loading';

import OccurencesTable from '../../../../components/table/registration/occurrencesTable';
import {
  occurrencesDelete,
  occurrencesEdit,
  occurrencesRegistration,
} from '../../../../services/api';

import '../../style.css';
import { addClassRowSelected, removeClassRowSelected } from '../../script.js';

const Occurrences = ({ id, name }) => {
  const [occurrenceID, setOccurrenceID] = useState('');
  const [analystID, setAnalystID] = useState('');
  const [ocType, setOcType] = useState('');
  const [ocPeriod, setOcPeriod] = useState('');
  const [dtaStart, setDtaStart] = useState('');
  const [dtaEnd, setDtaEnd] = useState('');
  const [note, setNote] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleInsertData = (data) => {
    addClassRowSelected(data.id, '.rows-table-occurrence');

    setOccurrenceID(data.id);
    setAnalystID(data.analystID);
    setOcType(data.ocType);
    setOcPeriod(data.ocPeriod);
    setDtaStart(data.dtaStart);
    setDtaEnd(data.dtaEnd);
    setNote(data.note);
  };

  const clearInputs = () => {
    removeClassRowSelected('.rows-table-occurrence');

    setOccurrenceID('');
    setAnalystID('');
    setOcType('');
    setOcPeriod('');
    setDtaStart('');
    setDtaEnd('');
    setNote('');
  };

  const handleSubmit = (idButton) => {
    switch (idButton) {
      case 'btn-save':
        if (ocType == 0 || ocPeriod == 0 || dtaStart == 0 || dtaEnd == 0) {
          warningMessage('Preencha os campos antes de salvar', 'Aviso');
        } else if (dtaStart > dtaEnd) {
          warningMessage('A data de início não pode ser maior que data final', 'Aviso');
        } else {
          handleOccurrenceEdit(occurrenceID, analystID, ocType, ocPeriod, dtaStart, dtaEnd, note);
        }
        break;
      case 'btn-insert':
        if (ocType == 0 || ocPeriod == 0 || dtaStart == 0 || dtaEnd == 0) {
          warningMessage('Preencha os campos antes de inserir', 'Aviso');
        } else if (dtaStart > dtaEnd) {
          warningMessage('A data de início não pode ser maior que data final', 'Aviso');
        } else {
          handleOccurrencesRegistration(id, ocType, ocPeriod, dtaStart, dtaEnd, note);
        }
        break;
      case 'btn-delete':
        handleOcurrenceDelete(occurrenceID);
        break;
    }
  };

  const handleOccurrencesRegistration = async (
    analystID,
    ocType,
    ocPeriod,
    dtaStart,
    dtaEnd,
    note
  ) => {
    setIsLoading(true);
    await occurrencesRegistration(analystID, ocType, ocPeriod, dtaStart, dtaEnd, note)
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

  const handleOccurrenceEdit = async (
    occurrenceID,
    analystID,
    ocType,
    ocPeriod,
    dtaStart,
    dtaEnd,
    note
  ) => {
    setIsLoading(true);
    await occurrencesEdit(occurrenceID, analystID, ocType, ocPeriod, dtaStart, dtaEnd, note)
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

  const handleOcurrenceDelete = async (occurrenceID) => {
    setIsLoading(true);
    await occurrencesDelete(occurrenceID)
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

  return (
    <Fragment>
      {isLoading ? (
        <Fragment>
          <div
            className="modal fade"
            id="occurrencesAnalyst"
            aria-labelledby="occurrencesAnalyst"
            aria-hidden="true"
          >
            <Loading />
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="modal-title title-ocurrences" id="occurrencesAnalyst">
                    Manutenção de Ocorrências
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={clearInputs}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-4">
                      <OccurencesTable handleInsertData={handleInsertData} />
                    </div>
                    <div className="col-8">
                      <form className="reg-form registration-ocurrences">
                        <label className="form-label label-analyst">{name}</label>
                        <hr />
                        <div className="row">
                          <div className="col-6 mt-4">
                            <div className="form-group form-group-registration">
                              <select
                                id="ocurrence"
                                placeholder="ocurrence"
                                value={ocType}
                                onChange={(e) => setOcType(e.target.value)}
                                className="form-select form-select-sm"
                              >
                                <option value="0">Selecione</option>
                                <option value="Atestado">Atestado</option>
                                <option value="Folga">Folga</option>
                                <option value="Férias">Férias</option>
                                <option value="Treinamento">Treinamento</option>
                                <option value="Home-Office">Home-Office</option>
                                <option value="Outros">Outros</option>
                              </select>
                              <label className="form-label form-label-registration">
                                Ocorrência
                              </label>
                            </div>
                          </div>
                          <div className="col-6 mt-4">
                            <div className="form-group form-group-registration">
                              <select
                                id="ocurrence"
                                placeholder="ocurrence"
                                value={ocPeriod}
                                onChange={(e) => setOcPeriod(e.target.value)}
                                className="form-select form-select-sm"
                              >
                                <option value="0">Selecione</option>
                                <option value="I">Integral</option>
                                <option value="M">Manhã</option>
                                <option value="T">Tarde</option>
                              </select>
                              <label className="form-label form-label-registration">Turno</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 mt-4">
                            <div className="form-group form-group-registration mb-4">
                              <input
                                id="ocurrence-start"
                                type="date"
                                placeholder="ocurrence-start"
                                value={dtaStart}
                                onChange={(e) => setDtaStart(e.target.value)}
                                className="form-control form-control-sm form-input"
                              />
                              <label className="form-label form-label-registration">Início</label>
                            </div>
                          </div>
                          <div className="col-6 mt-4">
                            <div className="form-group form-group-registration mb-4">
                              <input
                                id="ocurrence-end"
                                type="date"
                                placeholder="ocurrence-end"
                                value={dtaEnd}
                                onChange={(e) => setDtaEnd(e.target.value)}
                                className="form-control form-control-sm form-input"
                              />
                              <label className="form-label form-label-registration">Fim</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group form-group-registration">
                            <textarea
                              id="note"
                              type="text"
                              rows={3}
                              placeholder="note"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                              className="form-control form-control-sm form-input"
                            />
                            <label className="form-label form-label-registration">Observação</label>
                          </div>
                        </div>
                        <div className="row group-ib-ocurrences">
                          <div className="col-2">
                            {!occurrenceID ? (
                              <button id="btn-save" className="buttons" disabled type="button">
                                <BsCheckLg className="ib-ocurrences" />
                              </button>
                            ) : (
                              <button
                                id="btn-save"
                                className="buttons"
                                onClick={() => handleSubmit('btn-save')}
                                type="button"
                              >
                                <BsCheckLg className="ib-ocurrences" />
                              </button>
                            )}
                          </div>
                          <div className="col-2">
                            {analystID ? (
                              <button id="btn-insert" className="buttons" disabled type="button">
                                <BiPlusMedical className="ib-ocurrences" />
                              </button>
                            ) : (
                              <button
                                id="btn-insert"
                                className="buttons"
                                onClick={() => handleSubmit('btn-insert')}
                                type="button"
                              >
                                <BiPlusMedical className="ib-ocurrences" />
                              </button>
                            )}
                          </div>
                          <div className="col-2">
                            <button
                              id="btn-cancel"
                              className="buttons"
                              onClick={() => clearInputs()}
                              type="button"
                            >
                              <MdOutlineCancel className="ib-ocurrences" />
                            </button>
                          </div>
                          <div className="col-2">
                            {!occurrenceID ? (
                              <button id="btn-delete" className="buttons" disabled type="button">
                                <RiDeleteBin5Line className="ib-ocurrences" />
                              </button>
                            ) : (
                              <button
                                id="btn-delete"
                                className="buttons"
                                onClick={() => handleSubmit('btn-delete')}
                                type="button"
                              >
                                <RiDeleteBin5Line className="ib-ocurrences" />
                              </button>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div
            className="modal fade"
            id="occurrencesAnalyst"
            aria-labelledby="occurrencesAnalyst"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="modal-title title-ocurrences" id="occurrencesAnalyst">
                    Manutenção de Ocorrências
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={clearInputs}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-4">
                      <OccurencesTable handleInsertData={handleInsertData} id={id} />
                    </div>
                    <div className="col-8">
                      <form className="reg-form registration-ocurrences">
                        <label className="form-label label-analyst">{name}</label>
                        <hr />
                        <div className="row">
                          <div className="col-6 mt-4">
                            <div className="form-group form-group-registration">
                              <select
                                id="ocurrence"
                                placeholder="ocurrence"
                                value={ocType}
                                onChange={(e) => setOcType(e.target.value)}
                                className="form-select form-select-sm"
                              >
                                <option value="0">Selecione</option>
                                <option value="Atestado">Atestado</option>
                                <option value="Folga">Folga</option>
                                <option value="Férias">Férias</option>
                                <option value="Treinamento">Treinamento</option>
                                <option value="Home-Office">Home-Office</option>
                                <option value="Outros">Outros</option>
                              </select>
                              <label className="form-label form-label-registration">
                                Ocorrência
                              </label>
                            </div>
                          </div>
                          <div className="col-6 mt-4">
                            <div className="form-group form-group-registration">
                              <select
                                id="oc-period"
                                placeholder="oc-period"
                                value={ocPeriod}
                                onChange={(e) => setOcPeriod(e.target.value)}
                                className="form-select form-select-sm"
                              >
                                <option value="0">Selecione</option>
                                <option value="I">Integral</option>
                                <option value="M">Manhã</option>
                                <option value="T">Tarde</option>
                              </select>
                              <label className="form-label form-label-registration">Turno</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 mt-4">
                            <div className="form-group form-group-registration mb-4">
                              <input
                                id="ocurrence-start"
                                type="date"
                                placeholder="ocurrence-start"
                                value={dtaStart}
                                onChange={(e) => setDtaStart(e.target.value)}
                                className="form-control form-control-sm form-input"
                              />
                              <label className="form-label form-label-registration">Início</label>
                            </div>
                          </div>
                          <div className="col-6 mt-4">
                            <div className="form-group form-group-registration mb-4">
                              <input
                                id="ocurrence-end"
                                type="date"
                                placeholder="ocurrence-end"
                                value={dtaEnd}
                                onChange={(e) => setDtaEnd(e.target.value)}
                                className="form-control form-control-sm form-input"
                              />
                              <label className="form-label form-label-registration">Fim</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group form-group-registration">
                            <textarea
                              id="note"
                              type="text"
                              rows={3}
                              placeholder="note"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                              className="form-control form-control-sm form-input"
                            />
                            <label className="form-label form-label-registration">Observação</label>
                          </div>
                        </div>
                        <div className="row group-ib-ocurrences">
                          <div className="col-2">
                            {!occurrenceID ? (
                              <button id="btn-save" className="buttons" disabled type="button">
                                <BsCheckLg className="ib-ocurrences" />
                              </button>
                            ) : (
                              <button
                                id="btn-save"
                                className="buttons"
                                onClick={() => handleSubmit('btn-save')}
                                type="button"
                              >
                                <BsCheckLg className="ib-ocurrences" />
                              </button>
                            )}
                          </div>
                          <div className="col-2">
                            {analystID ? (
                              <button id="btn-insert" className="buttons" disabled type="button">
                                <BiPlusMedical className="ib-ocurrences" />
                              </button>
                            ) : (
                              <button
                                id="btn-insert"
                                className="buttons"
                                onClick={() => handleSubmit('btn-insert')}
                                type="button"
                              >
                                <BiPlusMedical className="ib-ocurrences" />
                              </button>
                            )}
                          </div>
                          <div className="col-2">
                            <button
                              id="btn-cancel"
                              className="buttons"
                              onClick={() => clearInputs()}
                              type="button"
                            >
                              <MdOutlineCancel className="ib-ocurrences" />
                            </button>
                          </div>
                          <div className="col-2">
                            {!occurrenceID ? (
                              <button id="btn-delete" className="buttons" disabled type="button">
                                <RiDeleteBin5Line className="ib-ocurrences" />
                              </button>
                            ) : (
                              <button
                                id="btn-delete"
                                className="buttons"
                                onClick={() => handleSubmit('btn-delete')}
                                type="button"
                              >
                                <RiDeleteBin5Line className="ib-ocurrences" />
                              </button>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Occurrences;
