import * as types from "./types";

export const addUser = user => ({
  type: types.ADD_USER,
  payload: {
    user
  }
});

export const updateUser = user => ({
  type: types.UPDATE_USER,
  payload: {
    user
  }
});

export const deleteUser = id => ({
  type: types.DELETE_USER,
  payload: {
    id
  }
});
