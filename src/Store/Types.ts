const SET_USER = "SET_USER";
const SET_AUTH = "SET_AUTH";
const SET_ISSIGNUP_FROM_VALID = "SET_ISSIGNUP_FROM_VALID";
const SET_FIELDS_VALIDATION = "SET_FIELDS_VALIDATION";
const SET_ISVALID_FORM = "SET_ISVALID_FORM";
const RESET_INPUTS = "RESET_INPUTS";
const EMAIL_TYPE = "email";
const PASSWORD_TYPE = "password";
const FIRST_NAME = "f-name";
const MIDDLE_Name = "mid-name";
const LAST_NAME = "l-name";

export {
  SET_USER,
  SET_AUTH,
  SET_FIELDS_VALIDATION,
  SET_ISVALID_FORM,
  RESET_INPUTS,
  EMAIL_TYPE,
  PASSWORD_TYPE,
  FIRST_NAME,
  MIDDLE_Name,
  LAST_NAME,
  SET_ISSIGNUP_FROM_VALID,
};
type FormError = {
  email: string;
  password: string;
  fName: string;
  lName: string;
  mName: string;
  code: string;
};

export type StateContent = {
  isAuth: boolean;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  code: string;
  isEmailValid: boolean;
  ispasswordValid: boolean;
  isformValid: boolean;
  formErrors: FormError;
  isFirstNameValid: boolean;
  isLastNameValid: boolean;
  isValidCode: boolean;
  isMiddleNameValid: boolean;
  isSignupFormValid: boolean;
};
export interface IContextProps {
  state: StateContent;
  dispatch: ({ type }: { type: string }) => void;
}
