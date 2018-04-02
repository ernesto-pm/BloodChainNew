import _ from "lodash";

const getUserList = state => {
  console.log("selector", state.userList);
  return _.map(state.userList, id => getUser(state, id));
};

const getUser = (state, id) => {
  const foundUser = state.users[id];
  return foundUser ? { id, ...foundUser } : null;
};

const getPatientList = (state, id) => {
  console.log(state.users[id].patients);
  return state.users[id].patients;
};

export default {
  getUserList,
  getPatientList
};
