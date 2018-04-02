import _ from "lodash";

const getUserList = state => {
  console.log("selector", state.userList);
  return _.map(state.userList, id => getUser(state, id));
};

const getUser = (state, id) => {
  const foundUser = state.users[id];
  return foundUser ? { id, ...foundUser } : null;
};

const getPatientList = state => {
  return _.map(state.userList, id => getPatient(state, getUser(state, id).id));
};

const getPatient = (state, id) => {
  const foundPatient = state.users[id].patients;
  console.log(foundPatient);
  return foundPatient ? { ...foundPatient } : null;
};

export default {
  getUserList,
  getPatientList
};
