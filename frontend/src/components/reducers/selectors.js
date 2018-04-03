import _ from "lodash";

const getPatientList = state => {
  console.log("selector", state.patientList);
  return _.map(state.patientList, id => getPatient(state, id));
};

const getPatient = (state, id) => {
  const foundPatient = state.patients[id];
  return foundPatient ? { id, ...foundPatient } : null;
};

export default {
  getPatientList
};
