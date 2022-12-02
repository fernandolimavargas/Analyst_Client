import React, { useState, useEffect, Fragment } from 'react';

import { warningMessage, errorMessage } from '../messages';

import { MdNotificationsNone, MdOutlineNotificationsActive } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';

import { notificationList, notificationReading } from '../../services/api';

import './style.css';
import LoadingTables from '../loadingTables';

const Notifications = () => {
  const [data, setData] = useState();
  const [notificationButton, setNotificationButton] = useState(false);

  useEffect(() => {
    notificationList()
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        try {
          warningMessage(err.response.data.message, 'Aviso');
        } catch (err) {
          errorMessage('Status Desconhecido.', 'Erro');
        }
      });
  }, []);

  const handleRefreshNotification = () => {
    setNotificationButton(!notificationButton);
    notificationList()
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        try {
          warningMessage(err.response.data.message, 'Aviso');
        } catch (err) {
          errorMessage('Status Desconhecido.', 'Erro');
        }
      });
  };

  const handleSubmitNotification = (notificationId) => {
    const element = document.querySelector('#nofiticationNro' + notificationId);

    notificationReading(notificationId);

    element.classList.replace('notification-icon-not-read', 'notification-icon-read');
  };

  return (
    <div className="dropdown-container-notification">
      <div role="button" onClick={handleRefreshNotification}>
        {data == undefined || data == '' ? (
          <MdNotificationsNone />
        ) : (
          <MdOutlineNotificationsActive />
        )}
      </div>
      {notificationButton && (
        <Fragment>
          <div
            className="div-outside-drodown-notification"
            onClick={handleRefreshNotification}
          ></div>
          <div className="dropdownMenuNotification">
            <div className="dropdown-notification-title d-flex justify-content-center">
              <span className="">Listagem de notificações</span>
            </div>
            {data == undefined ? (
              <LoadingTables />
            ) : (
              <div className="dropdown-list">
                {data == '' ? (
                  <div className="title-no-notification d-flex justify-content-center">
                    <span className="">...</span>
                  </div>
                ) : (
                  <Fragment>
                    {data.map((item, index) => {
                      return (
                        <div key={index} className="dropdown-item">
                          <div className="title-not">
                            <span>
                              {item.type} | {item.subType}
                            </span>
                          </div>
                          <div>
                            <span className="infs-nots-dta">{item.dtaCreate}</span>
                          </div>
                          <div className="infs-nots">
                            <p>Mensagem: {item.message}</p>
                          </div>
                          <div
                            id={'nofiticationNro' + item.notificationId}
                            className="notification-icon-not-read"
                            onClick={() => handleSubmitNotification(item.notificationId)}
                          >
                            <BsCheckCircle /> Lido
                          </div>
                        </div>
                      );
                    })}
                  </Fragment>
                )}
              </div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Notifications;
