import axios from 'axios';

export const api = axios.create({ baseURL: 'https://auto-dmshelp.azurewebsites.net' });
//export const api = axios.create({ baseURL: 'http://localhost:5050/' });

const headers = {
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('token'),
};

export const createSession = async (user, password, acessToken) => {
  return await api.post('/Login', { user, password, acessToken });
};

export const createSolAlt = async (systemDoing, shouldDo, note, requestType) => {
  return await api.post(
    '/ErrorChangeRequest',
    { systemDoing, shouldDo, note, requestType },
    { headers: headers }
  );
};

export const forgetPassword = async (email) => {
  return await api.post('/PasswordRecovery', { email });
};

export const requestAccess = async (email) => {
  return await api.post('/RequestAccess', { email });
};

export const generalQueuesInformation = () => {
  return api.get('/GeneralQueuesInformation', {
    headers: { Authorization: localStorage.getItem('token') },
  });
};

export const infFilasGeraisAnalitic = () => {
  return api.get('/AnalystQueuesInformationAnalitic', {
    headers: { Authorization: localStorage.getItem('token') },
  });
};

export const analystQueuesInformation = () => {
  return api.get('/AnalystQueuesInformation', {
    headers: { Authorization: localStorage.getItem('token') },
  });
};

export const analystQueuesInformationFooter = () => {
  return api.get('/AnalystQueuesInformationFooter', {
    headers: { Authorization: localStorage.getItem('token') },
  });
};

export const userRegistration = async (
  userType,
  name,
  email,
  committee,
  inactive,
  password,
  office,
  goal,
  team
) => {
  return await api.post(
    '/UserRegistration',
    { userType, name, email, committee, inactive, password, office, goal, team },
    { headers: headers }
  );
};

export const userAlteration = async (
  userID,
  userType,
  name,
  email,
  committee,
  inactive,
  password,
  office,
  goal,
  team
) => {
  return await api.put(
    '/UserAlteration',
    { userID, userType, name, email, committee, inactive, password, office, goal, team },
    { headers: headers }
  );
};

export const userDelete = async (userID, type) => {
  return await api.delete('/UserDelete', {
    headers: { Authorization: localStorage.getItem('token'), userID, type },
  });
};

export const userList = (userProfile) => {
  return api.get('/UserList', {
    headers: { Authorization: localStorage.getItem('token'), userProfile },
  });
};

export const occurrencesList = async (userID) => {
  return await api.get('/OccurrencesList', {
    headers: { Authorization: localStorage.getItem('token'), userID },
  });
};

export const occurrencesRegistration = async (userID, ocType, ocPeriod, dtaStart, dtaEnd, note) => {
  return await api.post(
    '/OccurrencesRegistration',
    { userID, ocType, ocPeriod, dtaStart, dtaEnd, note },
    { headers: headers }
  );
};

export const occurrencesDelete = async (occurrenceID) => {
  return await api.delete('/OccurrencesDelete', {
    headers: { Authorization: localStorage.getItem('token'), occurrenceID },
  });
};

export const occurrencesEdit = async (
  occurrenceID,
  userID,
  ocType,
  ocPeriod,
  dtaStart,
  dtaEnd,
  note
) => {
  return await api.put(
    '/OccurrencesEdit',
    { occurrenceID, userID, ocType, ocPeriod, dtaStart, dtaEnd, note },
    { headers: headers }
  );
};

export const teamsRegistration = async (name, helperID, managerID) => {
  return await api.post('/TeamsRegistration', { name, helperID, managerID }, { headers: headers });
};

export const teamsEdit = async (teamID, name, helperID, managerID) => {
  return await api.put('/TeamsEdit', { teamID, name, helperID, managerID }, { headers: headers });
};

export const teamsDelete = async (teamID) => {
  return await api.delete('/TeamsDelete', {
    headers: { Authorization: localStorage.getItem('token'), teamID },
  });
};

export const teamsList = () => {
  return api.get('/TeamsList', { headers: { Authorization: localStorage.getItem('token') } });
};

export const databaseDelete = (dbID) => {
  return api.delete('/DatabaseDelete', {
    headers: { Authorization: localStorage.getItem('token'), dbID },
  });
};

export const databaseRegistration = (
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
  return api.post(
    '/DatabaseRegistration',
    { structure, client, brands, server, instance, charset, dbUser, size, dtaDmpBak },
    { headers: headers }
  );
};

export const databaseEdit = (
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
  return api.put(
    '/DatabaseEdit',
    { dbID, structure, client, brands, server, instance, charset, dbUser, size, dtaDmpBak },
    { headers: headers }
  );
};

export const dataBaseList = () => {
  return api.get('/DatabaseList', { headers: { Authorization: localStorage.getItem('token') } });
};

export const requestCardsInformation = () => {
  return api.get('/RequestCardsInformation', {
    headers: { Authorization: localStorage.getItem('token') },
  });
};

export const testConnection = (structure, server, database, username, password) => {
  return api.post(
    '/TestConnection',
    { structure, server, database, username, password },
    { headers: headers }
  );
};

export const reqError = (
  nroTp,
  pathMenu,
  codMenu,
  making,
  make,
  alternative,
  linkDocs,
  typeDb,
  userDb,
  base,
  server,
  version,
  prevVersion,
  obs,
  duplicate
) => {
  return api.post(
    '/ReqError',
    {
      nroTp,
      pathMenu,
      codMenu,
      making,
      make,
      alternative,
      linkDocs,
      typeDb,
      userDb,
      base,
      server,
      version,
      prevVersion,
      obs,
      duplicate,
    },
    { headers: headers }
  );
};

export const reqErrorList = (idRequest) => {
  return api.get('/ReqErrorList', {
    headers: { Authorization: localStorage.getItem('token'), idRequest },
  });
};

export const reqErrorStart = (idRequest) => {
  return api.put('/ReqErrorStart', { idRequest }, { headers: headers });
};

export const reqErrorAproved = (idRequest, message) => {
  return api.put('/ReqErrorAproved', { idRequest, message }, { headers: headers });
};

export const reqErrorMark = (idRequest, issue) => {
  return api.put('/ReqErrorMark', { idRequest, issue }, { headers: headers });
};

export const reqErrorFinished = (idRequest, message) => {
  return api.put('/ReqErrorFinished', { idRequest, message }, { headers: headers });
};

export const reqErrorInf = (idRequest, message) => {
  return api.put('/ReqErrorInf', { idRequest, message }, { headers: headers });
};

export const reqErrorInfRes = (idRequest, message) => {
  return api.put('/ReqErrorInfRes', { idRequest, message }, { headers: headers });
};

export const reqErrorRecused = (idRequest, message) => {
  return api.put('/ReqErrorRecused', { idRequest, message }, { headers: headers });
};

export const reqErrorEdit = (
  idRequest,
  nroTp,
  pathMenu,
  codMenu,
  making,
  make,
  alternative,
  linkDocs,
  typeDb,
  userDb,
  base,
  server,
  version,
  prevVersion,
  obs
) => {
  return api.put(
    '/ReqErrorEdit',
    {
      idRequest,
      nroTp,
      pathMenu,
      codMenu,
      making,
      make,
      alternative,
      linkDocs,
      typeDb,
      userDb,
      base,
      server,
      version,
      prevVersion,
      obs,
    },
    { headers: headers }
  );
};

export const reqErrorReopen = (idRequest, message) => {
  return api.put('/ReqErrorReopen', { idRequest, message }, { headers: headers });
};

export const reqErrorRefer = (idRequest, helperToForward) => {
  return api.put('/ReqErrorRefer', { idRequest, helperToForward }, { headers: headers });
};

export const reqMovements = async (requestId) => {
  return await api.get('/ReqMovements', {
    headers: { Authorization: localStorage.getItem('token'), requestId },
  });
};

export const notificationList = () => {
  return api.get('/NotificationList', {
    headers: { Authorization: localStorage.getItem('token') },
  });
};

export const notificationReading = (notificationId) => {
  return api.put('/NotificationReading', { notificationId }, { headers: headers });
};
