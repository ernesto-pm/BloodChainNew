import * as types from "./types";
import simpleId from "simple-id";
import _ from "lodash";

const initialState = {
    patientList: [1, 2],
    patients: {
        "1": {
            id: 1,
            name: "Juan José Franco",
            bloodType: "A",
            rhType: "+",
            weight: 75,
            temperature: "30.2",
            degree: "C"
        },
        "2": {
            id: 2,
            name: "Susana Moreno",
            bloodType: "O",
            rhType: "-",
            weight: 60,
            temperature: "94.3",
            degree: "F"
        }
    }
};

const deleteUser = (arrayList, id) => _.filter(arrayList, user => user !== id);

const handleAddUser = (state, { user }) => {
    const id = simpleId();
    console.log("USEEER", user);
    return user;
};

const handleUpdateUser = (state, { user }) => {
    const { id, ...rest } = user;
    return {
        ...state,
        userList: [...state.userList],
        users: {
            ...state.users,
            [id]: _.merge({}, state.users[id], rest)
        }
    };
};

const handleDeleteUser = (state, { id }) => {
    return {
        ...state,
        userList: deleteUser(state.userList, id),
        users: _.omit(state.users, id)
    };
};

const handleAddPatient = (state, { patient }) => {
    const id = simpleId();
    console.log("Donation", patient);
    return {
        ...state,
        patientList: [...state.patientList, id],
        patients: { ...state.patients, [id]: patient }
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_USER:
            return handleAddUser(state, action.payload);
        case types.DELETE_USER:
            return handleDeleteUser(state, action.payload);
        case types.UPDATE_USER:
            return handleUpdateUser(state, action.payload);
        case types.ADD_PATIENT:
            return handleAddPatient(state, action.payload);
        default:
            return state;
    }
};

export default reducer;
