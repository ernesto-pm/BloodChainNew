import * as types from "./types";
import simpleId from "simple-id";
import _ from "lodash";

const initialState = {
  userList: [1],
  users: {
    1: {
      username: "angeles",
      password: "1234",
      name: "Hospital Ángeles",
      address: "Pedregal 2001",
      state: "CDMX",
      city: "CDMX",
      zipCode: "04500",
      type: 1,
      typeName: "Hospital",
      patients: [
        {
          id: 1,
          name: "Juan Franco",
          type: "donor",
          bloodType: "A+",
          weight: 75,
          height: 1.7,
          sex: "M",
          age: 30,
          diseases: [
            {
              name: "Diabetes",
              description: "Type 1"
            }
          ]
        },
        {
          id: 2,
          name: "Susana Rdz",
          type: "donor",
          bloodType: "O+",
          weight: 75,
          height: 1.7,
          sex: "F",
          age: 30,
          diseases: [
            {
              name: "Diabetes",
              description: "Type 1"
            }
          ]
        }
      ]
    }
  }
};

const deleteUser = (arrayList, id) => _.filter(arrayList, user => user !== id);

const handleAddUser = (state, { user }) => {
  const id = simpleId();
  console.log("USEEER", user);
  return {
    ...state,
    userList: [...state.userList, id],
    users: {
      ...state.users,
      [id]: user
    }
  };
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return handleAddUser(state, action.payload);
    case types.DELETE_USER:
      return handleDeleteUser(state, action.payload);
    case types.UPDATE_USER:
      return handleUpdateUser(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
