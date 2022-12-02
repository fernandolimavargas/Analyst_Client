import React from 'react';

import { BsQuestionCircleFill } from 'react-icons/bs';
import { BiDislike, BiLike } from 'react-icons/bi';

import './style.css';

const ConfirmDelete = (props) => {
  const {
    location,
    userType,
    idDel,
    nameDel,
    hanldeDatabaseDelete,
    handleTeamsDelete,
    handleUserDelete,
  } = props;

  return (
    <div
      className="modal fade"
      id="modal-confirm-delete"
      aria-labelledby="modal-confirm-delete"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <BsQuestionCircleFill id="BsQuestionCircleFill" />
          </div>
          <div className="modal-body body-confirm-delete">
            {location == 'users' && <p>Realmente deseja excluir o usuário {nameDel}?</p>}
            {location == 'teams' && <p>Realmente deseja excluir {nameDel}?</p>}
            {location == 'databases' && <p>Realmente deseja excluir a base {nameDel}?</p>}
          </div>
          <div className="modal-footer">
            <div className="col-4 footer-confirm-delete">
              {location == 'users' && (
                <button
                  type="button"
                  onClick={() => handleUserDelete(idDel, userType)}
                  className="buttons buttons-confirm-delete"
                  data-bs-dismiss="modal"
                >
                  <BiLike className="icon-dislike-like" />
                  Confirmar
                </button>
              )}
              {location == 'teams' && (
                <button
                  type="button"
                  onClick={() => handleTeamsDelete(idDel)}
                  className="buttons buttons-confirm-delete"
                  data-bs-dismiss="modal"
                >
                  <BiLike className="icon-dislike-like" />
                  Confirmar
                </button>
              )}
              {location == 'databases' && (
                <button
                  type="button"
                  onClick={() => hanldeDatabaseDelete(idDel)}
                  className="buttons buttons-confirm-delete"
                  data-bs-dismiss="modal"
                >
                  <BiLike className="icon-dislike-like" />
                  Confirmar
                </button>
              )}
              <button
                type="button"
                className="buttons buttons-confirm-delete"
                data-bs-dismiss="modal"
              >
                <BiDislike className="icon-dislike-like" />
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
