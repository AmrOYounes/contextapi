import {
  StateContent,
  SET_AUTH,
  SET_USER,
  SET_FIELDS_VALIDATION,
  SET_ISVALID_FORM,
  EMAIL_TYPE,
  PASSWORD_TYPE,
  FIRST_NAME,
  MIDDLE_Name,
  LAST_NAME,
  RESET_INPUTS,
  SET_ISSIGNUP_FROM_VALID,
} from "./Types";

import { validate } from "../utils/utils";
import { setIsValidForm } from "./action";

export const initialState: StateContent = {
  isAuth: false,
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  middleName: "",
  isEmailValid: true,
  code: "",
  ispasswordValid: true,
  isformValid: false,
  isSignupFormValid: false,
  isFirstNameValid: true,
  isLastNameValid: true,
  isValidCode: true,
  isMiddleNameValid: true,
  formErrors: {
  email: "",
  password: "",
  fName: "",
  lName: "",
  mName: "",
  code: "",
  },
};

export const userReducer = (state: any, action: Action) => {
  let temp = { ...state };

  switch (action.type) {

    case SET_AUTH:
      return {
        ...state,
        isAuth: !state.isAuth,
      };

    case SET_FIELDS_VALIDATION:

      const { name, value } = action.payload;
      switch (name) {

        case EMAIL_TYPE:
          if (!value) {
            temp = {
              ...state,
              isEmailValid: false,
              formErrors: { ...state.formErrors, email: "Required" },
            };
          } else {
            if (!validate(EMAIL_TYPE, value)) {
              temp = {
                ...state,
                email: value,
                isEmailValid: false,
                formErrors: { ...state.formErrors, email: "Not valid email" },
              };
            } else {
              temp = { ...state, email: value, isEmailValid: true };
            }
          }
          return temp;

        case PASSWORD_TYPE:
          if (!value) {
            temp = {
              ...state,
              ispasswordValid: false,
              formErrors: { ...state.formErrors, password: "Required" },
            };
          } else {
            if (!validate(PASSWORD_TYPE, value)) {
              temp = {
                ...state,
                password: value,
                ispasswordValid: false,
                formErrors: {
                  ...state.formErrors,
                  password: "Not valid password",
                },
              };
            } else {
              temp = { ...state, password: value, ispasswordValid: true };
            }
          }
          break;
        case FIRST_NAME:
          if (!value) {
            temp = {
              ...state,
              isFirstNameValid: false,
              formErrors: { ...state.formErrors, fName: "Required" },
            };
          } else {
            if (!validate("name", value)) {
              temp = {
                ...state,
                firstName: value,
                isFirstNameValid: false,
                formErrors: {
                  ...state.formErrors,
                  fName: "Not valid name",
                },
              };
            } else {
              temp = { ...state, firstName: value, isFirstNameValid: true };
            }
          }
          break;
        case MIDDLE_Name:
          if (!value) {
            temp = {
              ...state,
              isMiddleNameValid: true,
            };
          } else {
            if (!validate("name", value)) {
              temp = {
                ...state,
                middleName: value,
                isMiddleNameValid: false,
                formErrors: {
                  ...state.formErrors,
                  mName: "Not valid name",
                },
              };
            } else {
              temp = { ...state, middleName: value, isMiddleNameValid: true };
            }
          }
          break;
        case LAST_NAME:
          if (!value) {
            temp = {
              ...state,
              isLastNameValid: false,
              formErrors: { ...state.formErrors, lName: "Required" },
            };
          } else {
            if (!validate("name", value)) {
              temp = {
                ...state,
                lastName: value,
                isLastNameValid: false,
                formErrors: {
                  ...state.formErrors,
                  lName: "Not valid name",
                },
              };
            } else {
              temp = { ...state, lastName: value, isLastNameValid: true };
            }
          }
      }
      return temp;

    case SET_ISVALID_FORM:
      return {
        ...state,
        isformValid: !!(
          state.isEmailValid &&
          state.ispasswordValid &&
          state.email &&
          state.password
        ),
      };

    case SET_ISSIGNUP_FROM_VALID:
      return {
          ...state,
          isSignupFormValid: !!(
          state.isEmailValid &&
          state.ispasswordValid &&
          state.isFirstNameValid &&
          state.isLastNameValid &&
          state.email &&
          state.password &&
          state.firstName &&
          state.lastName
        ),
      };
    case RESET_INPUTS:
      return {
        ...state,
        email: "",
        password: "",
        isEmailValid: true,
        ispasswordValid: true,
      };
    default:
      return temp;
  }
};
