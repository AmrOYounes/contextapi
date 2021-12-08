import { SET_AUTH, SET_USER } from "./Types";

export const setUserInfo = (userInfoObject: any) => ({
  type: SET_USER,
  payload: userInfoObject,
});

export const toggleAuth = () => ({
  type: SET_AUTH,
});
