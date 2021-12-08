import { SET_AUTH, SET_USER } from "./Types";

import { validate } from "../utils/utils";

export const initialState: any = {
  isAuth: false,
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  middleName: "",
  code: "",
};

export const userReducer = (state: any, action: Action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: !state.isAuth,
      };

    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
