import React, { useState, useEffect, createContext, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSession } from '../services/api';
import Loading from '../components/loading';

import { warningMessage } from '../components/messages/index';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user_route, setUser_route] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const recovereUser = localStorage.getItem('user');

    if (recovereUser) {
      setUser_route(JSON.parse(recovereUser));
    }

    setLoading(false);
  }, []);

  const login = async (user, password) => {
    setIsLoading(true);
    await createSession(user, password)
      .then((resp) => {
        const loggedUser = {
          id: resp.data.id,
          name: resp.data.name,
          email: resp.data.email,
          tipo: resp.data.tipo,
        };
        const token = resp.data.token;

        localStorage.setItem('user', JSON.stringify(loggedUser));
        localStorage.setItem('token', token);

        setUser_route(loggedUser);
        navigate('/dashboard');
      })
      .catch((err) => {
        warningMessage(err.response.data.message, 'Aviso');
      });
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setUser_route(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user_route,
        user_route,
        loading,
        login,
        logout,
      }}
    >
      {isLoading && (
        <Fragment>
          <Loading />
          {children}
        </Fragment>
      )}
      {!isLoading && <Fragment>{children}</Fragment>}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
