import React, { useState, Fragment, useEffect } from 'react';
import Button from '../button';

import { BsCheckCircleFill, BsQuestionCircleFill } from 'react-icons/bs';
import { IoArrowForwardCircle } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { HiInformationCircle } from 'react-icons/hi';
import { BiDislike, BiLike } from 'react-icons/bi';

import { userList } from '../../services/api';

import './style.css';

const InformationRequest = (props) => {
  const { idReq, typeReq, action } = props;

  const [message, setMessage] = useState('');
  const [helper, setHelper] = useState();
  const [helperID, setHelperID] = useState('');

  useEffect(() => {
    if (action == 'forwards') {
      userList().then((resp) => {
        setHelper(resp.data);
      });
    }
  }, [action]);

  return (
    <div
      className="modal fade"
      id="modal-information-request"
      aria-labelledby="modal-information-request"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {typeReq == 'error' && (
              <Fragment>
                {action == 'question' && <HiInformationCircle className="icons-request" />}
                {action == 'answer' && <HiInformationCircle className="icons-request" />}
                {action == 'reprove' && <MdCancel className="icons-request" />}
                {action == 'finalize' && <BsCheckCircleFill className="icons-request" />}
                {action == 'reopen' && <BsQuestionCircleFill className="icons-request" />}
                {action == 'aproved' && <BsQuestionCircleFill className="icons-request" />}
                {action == 'forwards' && <IoArrowForwardCircle className="icons-request" />}
              </Fragment>
            )}
          </div>
          <div className="form-group form-group-registration confirm-information">
            {typeReq == 'error' && (
              <Fragment>
                {action == 'reopen' ? (
                  <p>Realmente deseja reabrir esta solicitação?</p>
                ) : (
                  <Fragment>
                    {action == 'forwards' ? (
                      <Fragment>
                        <div className="col-5 form-group-forwards">
                          <div className="form-group form-group-registration">
                            <select
                              id="team"
                              placeholder="team"
                              className="form-select form-select-sm"
                              value={helperID}
                              onChange={(e) => setHelperID(e.target.value)}
                            >
                              <option value="0">Selecione o Helper</option>
                              {helper != undefined &&
                                helper.map((item, index) => {
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
                      </Fragment>
                    ) : (
                      <Fragment>
                        {action == 'aproved' ? (
                          <p>Realmente deseja aprovar abertura de ISSUE esta solicitação?</p>
                        ) : (
                          <Fragment>
                            <textarea
                              id="message"
                              type="text"
                              rows="4"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="message"
                              className="form-control form-control-sm form-input"
                            />
                            <label className="form-label form-label-registration">
                              {action == 'question' && 'Solicitar Informação Adicional'}
                              {action == 'answer' && 'Responder Solicitação'}
                              {action == 'reprove' && 'Conclusão de Cancelamento'}
                              {action == 'finalize' && 'Conclusão de Finalização'}
                            </label>
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <div className="col-5">
              {typeReq == 'error' && (
                <Fragment>
                  {action == 'aproved' && (
                    <Button
                      icon={<BiLike />}
                      name="Confirmar"
                      dataDismiss="modal"
                      submit={() => props.handleReqErrorAproved(idReq, message)}
                    />
                  )}
                  {action == 'question' && (
                    <Button
                      icon={<BiLike />}
                      name="Confirmar"
                      dataDismiss="modal"
                      submit={() => props.handleReqErrorInf(idReq, message)}
                    />
                  )}
                  {action == 'reprove' && (
                    <Button
                      icon={<BiLike />}
                      name="Confirmar"
                      dataDismiss="modal"
                      submit={() => props.handleReqErrorRecused(idReq, message)}
                    />
                  )}
                  {action == 'finalize' && (
                    <Button
                      icon={<BiLike />}
                      name="Confirmar"
                      dataDismiss="modal"
                      submit={() => props.handleReqErrorFinished(idReq, message)}
                    />
                  )}
                  {action == 'answer' && (
                    <Button
                      icon={<BiLike />}
                      name="Confirmar"
                      dataDismiss="modal"
                      submit={() => props.handleReqErrorInfRes(idReq, message)}
                    />
                  )}
                  {action == 'reopen' && (
                    <Button
                      icon={<BiLike />}
                      name="Confirmar"
                      dataDismiss="modal"
                      submit={() => props.handleReqErrorReopen(idReq, message)}
                    />
                  )}
                  {action == 'forwards' && (
                    <Button
                      icon={<BiLike />}
                      name="Confirmar"
                      dataDismiss="modal"
                      submit={() => props.handleReqErrorRefer(idReq, helperID)}
                    />
                  )}
                </Fragment>
              )}
            </div>
            <div className="col-5">
              <Button icon={<BiDislike />} name="Fechar" dataDismiss="modal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationRequest;
