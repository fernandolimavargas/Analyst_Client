import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { forgetPassword, requestAccess } from '../../services/api';
import './style.css';
import lglogo from '../../img/lg-logo.png';
import { warningMessage, successMessage, errorMessage } from '../../components/messages';

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [forgetEmail, setForgetEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !password) {
      warningMessage('Preencha os campos antes de conectar', 'Aviso');
    } else {
      login(user, password);
      setPassword('');
    }
  };

  const handleForget = async (e) => {
    e.preventDefault();
    await forgetPassword(forgetEmail)
      .then((resp) => {
        successMessage(resp.data.message, 'Sucesso');
      })
      .catch((err) => {
        try {
          warningMessage(err.response.data.message, 'Aviso');
        } catch (error) {
          errorMessage('Status Desconhecido');
        }
      });
  };

  const handleAccess = async (e) => {
    e.preventDefault();
    await requestAccess(forgetEmail)
      .then((resp) => {
        successMessage(resp.data.message, 'Sucesso');
      })
      .catch((err) => {
        try {
          warningMessage(err.response.data.message, 'Aviso');
        } catch (err) {
          errorMessage('Status Desconhecido');
        }
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="div-lside col-3">
          <div className="col-6 title-1">
            <p>Linx</p>
          </div>
          <div className="col-6 title-2">
            <b>DMS HELP</b>
          </div>
          <p _ngcontent-rgy-c10="" className="copyright">
            {' '}
            © Linx - Todos direitos reservados{' '}
          </p>
        </div>

        <div className="div-rside div-rside col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
          <div className="div-form col-lg-3 col-md-4 col-sm-5 col-xs-6">
            <img src={lglogo} alt="logo" />
            <form className="form" onSubmit={handleSubmit}>
              <div className="div-form-control">
                <label className="form-label">Usuário:</label>
                <input
                  type="text"
                  className="form-control"
                  id="user"
                  placeholder="Digite seu usuário..."
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className="div-form-control">
                <label className="form-label">Senha:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Digite sua senha..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-secondary btn_login" type="submit" onClick={handleSubmit}>
                Conectar
              </button>
            </form>
          </div>
          <a
            type="button"
            className="helplogin"
            data-bs-toggle="modal"
            data-bs-target="#nologed"
            data-bs-whatever="@mdo"
          >
            Não consegue logar?
          </a>
        </div>
      </div>
      <div
        className="modal fade"
        id="nologed"
        tabIndex="-1"
        aria-labelledby="nologedLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="nologedLabel">
                Não consegue logar?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="recipient-name"
                    value={forgetEmail}
                    onChange={(e) => setForgetEmail(e.target.value)}
                  />
                </div>
                <div className="modal-footer d-flex justify-content-around">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleAccess}
                  >
                    Solicitar acesso
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleForget}
                  >
                    Resetar senha
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
