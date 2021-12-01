import {
  SET_AUTH,
  SET_FIELDS_VALIDATION,
  SET_USER,
  SET_ISVALID_FORM,
  StateContent,
  RESET_INPUTS,
  SET_ISSIGNUP_FROM_VALID,
} from "./Types";

export const setUser = (name: string, value: string) => ({
  type: SET_USER,
  payload: { name, value },
});

export const toggleAuth = () => ({
  type: SET_AUTH,
});

export const setInputValidStatus = (name: string, value: string) => ({
  type: SET_FIELDS_VALIDATION,
  payload: { name, value },
});

export const setIsValidForm = () => ({
  type: SET_ISVALID_FORM,
});

export const setIsSignupFormValid = () => ({
  type: SET_ISSIGNUP_FROM_VALID,
});

export const resetInputField = () => ({
  type: RESET_INPUTS,
});
