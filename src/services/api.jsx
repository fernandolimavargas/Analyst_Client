import axios from "axios";

//export const api = axios.create({ baseURL: "https://auto-dmshelp.azurewebsites.net" })
export const api = axios.create({ baseURL: "http://localhost:5050/" })

const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("token")
}

export const createSession = async (user, password, remember, acess_token) => {
    return await api.post("/Login", { user, password, remember, acess_token });
};

export const createSolAlt = async (systemDoing, shouldDo, note, requestType) => {
    return await api.post("/ErrorChangeRequest", { systemDoing, shouldDo, note, requestType }, { headers: headers })
};

export const forgetPassword = async (email) => {
    return await api.post("/PasswordRecovery", { email })
};

export const requestAccess = async (email) => {
    return await api.post("/RequestAccess", { email })
};

export const generalQueuesInformation = () => {
    return api.get("/GeneralQueuesInformation", { headers: {'Authorization': localStorage.getItem("token")} })
};

export const infFilasGeraisAnalitic = () => {
    return api.get("/AnalystQueuesInformationAnalitic", { headers: {'Authorization': localStorage.getItem("token")} })
};

export const analystRegistration = async (name, email, password, office, goal, team) => {
    return await api.post("/AnalystRegistration", { name, email, password, office, goal, team }, { headers: headers })
};

export const analystEdit = async (analystID, name, email, password, office, goal, team) => {
    return await api.put("/AnalystEdit", { analystID, name, email, password, office, goal, team }, { headers: headers })
};

export const analystDelete = async (analystID) => {
    return await api.delete("/AnalystDelete", {headers: {'Authorization': localStorage.getItem("token"), analystID}})
};

export const analystList = () => {
    return api.get("/AnalystList", { headers: {'Authorization': localStorage.getItem("token")} })
};

export const managerRegistration = async (name, email, password) => {
    return await api.post("/ManagerRegistration", { name, email, password }, { headers: headers })
};

export const managerEdit = async (managerID, name, email, password) => {
    return await api.put("/ManagerEdit", { managerID, name, email, password }, { headers: headers })
};

export const managerDelete = async (managerID) => {
    return await api.delete("/ManagerDelete", {headers: {'Authorization': localStorage.getItem("token"), managerID}})
};

export const managerList = () => {
    return api.get("/ManagerList", {headers: {'Authorization': localStorage.getItem("token")}})
};

export const helperRegistration = async (name, email, password) => {
    return await api.post("/HelperRegistration", { name, email, password }, { headers: headers })
};

export const helperEdit = async (helperID, name, email, password) => {
    return await api.put("/HelperEdit",  { helperID, name, email, password }, { headers: headers })
};

export const helperDelete = async (helperID) => {
    return await api.delete("/HelperDelete", {headers: {'Authorization': localStorage.getItem("token"), helperID}} )
};

export const helperList = () => {
    return api.get("/HelperList", { headers: {'Authorization': localStorage.getItem("token")} })
};

export const teamsRegistration = async (name, helperID, managerID) => {
    return await api.post("/TeamsRegistration", { name, helperID, managerID }, { headers: headers })
};

export const teamsEdit = async (teamID, name, helperID, managerID) => {
    return await api.put("/TeamsEdit", { teamID, name, helperID, managerID }, { headers: headers })
};

export const teamsDelete = async (teamID) => {
    return await api.delete("/TeamsDelete", {headers: {'Authorization': localStorage.getItem("token"), teamID}})
};

export const teamsList = () => {
    return api.get("/TeamsList", { headers: {'Authorization': localStorage.getItem("token")} })
};

export const databaseDelete = (dbID) => {
    return api.delete("/DatabaseDelete", { headers: {'Authorization': localStorage.getItem("token"), dbID} })
};

export const databaseRegistration = (structure, client, brands, server, instance, charset, dbUser, size, dtaDmpBak) => {
    return api.post("/DatabaseRegistration", { structure, client, brands, server, instance, charset, dbUser, size, dtaDmpBak }, { headers: headers })
};

export const databaseEdit = (dbID, structure, client, brands, server, instance, charset, dbUser, size, dtaDmpBak) => {
    return api.put("/DatabaseEdit", { dbID, structure, client, brands, server, instance, charset, dbUser, size, dtaDmpBak }, { headers: headers })
};

export const dataBaseList = () => {
    return api.get("/DatabaseList", { headers: {'Authorization': localStorage.getItem("token")} })
};


export const requestCardsInformation = () => {
    return api.get("/RequestCardsInformation", { headers: {'Authorization': localStorage.getItem("token")} })
};

export const analystRequestErrorList = () => {
    return api.get("/ReqErrorInf", { headers: {'Authorization': localStorage.getItem("token")} })
}

export const requestError = async (nro_tp, path_menu, cod_menu, making, make, alternative, link_docs, base, version, prev_version, duplicate) => {
    return await api.post("/AnalystRegistration", { name, email, password, office, goal, team }, { headers: headers })
};