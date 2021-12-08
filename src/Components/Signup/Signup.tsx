import React, { useEffect, useReducer } from "react";
import { signup } from "../../APIs/UserAPIs";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import ErrorIcon from "../../assets/images/error.png";
import { errorFieldClass, validFormClass } from "./../../consts";
import { validate } from "../../utils/utils";
import { setUserInfo } from "../../Store/action";
import "./Signup.styles.scss";
import { type } from "os";
import { stat } from "fs";

const initialState = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  password: "",
  code: "",
  formErrors: { fName: "", mName: "", lName: "", email: "", password: "" },
  formValidation: {
    firstName: true,
    middleName: true,
    lastName: true,
    email: true,
    password: true,
  },
  isFormValid: false,
};

const setInput = (value: any) => ({
  type: "SET_INPUTS",
  payload: value,
});

const signupReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_INPUTS":
      return {
        ...state,
        ...action.payload,
      };
  }
};

const Signup = () => {
  const { dispatchAction } = React.useContext(userContext);
  //  const {isFirstNameValid, isLastNameValid, isSignupFormValid,isMiddleNameValid, formErrors} = state;
  let navigate = useNavigate();

  const [state, dispatch] = useReducer(signupReducer, initialState);
  useEffect(() => {
    dispatch(
      setInput({
        isFormValid:
          state.formValidation.firstName &&
          state.formValidation.lastName &&
          state.formValidation.middleName &&
          state.formValidation.email &&
          state.formValidation.password &&
          state.firstName &&
          state.lastName &&
          state.email &&
          state.password,
      })
    );
  }, [
    state.formValidation.firstName,
    state.formValidation.lastName,
    state.formValidation.middleName,
    state.formValidation.email,
    state.formValidation.password,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setInput({ [name]: value }));
    validateInputField(name, value);
  };

  const validateInputField = (type: string, value: string) => {
    if (!value) {
      dispatch(
        setInput({ formValidation: { ...state.formValidation, [type]: false } })
      );
      dispatch(
        setInput({ formErrors: { ...state.formErrors, [type]: "Required" } })
      );
    } else {
      if (validate(type, value)) {
        dispatch(
          setInput({
            formValidation: { ...state.formValidation, [type]: true },
          })
        );
      } else {
        dispatch(
          setInput({
            formValidation: { ...state.formValidation, [type]: false },
          })
        );
        dispatch(
          setInput({ formErrors: { ...state.formErrors, [type]: "Not Valid" } })
        );
      }
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, middleName, lastName, email, password, code } = state;

    const userInfo = {
      firstName,
      middleName,
      lastName,
      email,
      password,
      code,
    };
    dispatchAction(setUserInfo(userInfo));
    signup(userInfo);
    navigate("/login");
  };

  //  useEffect ( ()=> {
  //   vaildForm();
  //  },[firstName, lastName, email, password])

  // const vaildForm = () => {
  //   dispatch(setIsSignupFormValid())
  //  };

  // const handleSignup = () => {
  //   const userInfo = {
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //   };
  //   // signup(userInfo);
  //   navigate("/login");
  // };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <div className="header-title">Welcome!</div>
        <div className="header-description">
          Applying for a Jasper Cash Back Mastercard® is quick and easy! Let's
          get you on board.
        </div>
      </div>

      <div className="signup-form">
        <form>
          <div className="fname-midname-container">
            <div className="fname-wrapper">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                onChange={handleChange}
                className={
                  state.formValidation.firstName ? "" : errorFieldClass
                }
                required
              />
              {!state.formValidation.firstName && (
                <>
                  <img src={ErrorIcon} alt="error" className="error-icon" />
                  <span className="valid-error">
                    {state.formErrors.firstName}
                  </span>
                </>
              )}
            </div>
            <div>
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                onChange={handleChange}
                className={
                  state.formValidation.middleName ? "" : errorFieldClass
                }
                required
              />
              {!state.formValidation.middleName && (
                <>
                  <img src={ErrorIcon} alt="error" className="error-icon" />
                  <span className="valid-error">
                    {state.formErrors.middleName}
                  </span>
                </>
              )}
            </div>
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name *"
              onChange={handleChange}
              className={state.formValidation.lastName ? "" : errorFieldClass}
              required
            />
            {!state.formValidation.lastName && (
              <>
                <img src={ErrorIcon} alt="error" className="error-icon" />
                <span className="valid-error">{state.formErrors.lastName}</span>
              </>
            )}
          </div>
          <div>
            <input
              type="text"
              name="code"
              placeholder="Promo Code (optional)"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail address"
              onChange={handleChange}
              className={state.formValidation.email ? "" : errorFieldClass}
              required
            />
            {!state.formValidation.email && (
              <>
                <img src={ErrorIcon} alt="error" className="error-icon" />
                <span className="valid-error">{state.formErrors.email}</span>
              </>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              onChange={handleChange}
              className={state.formValidation.password ? "" : errorFieldClass}
              required
            />
            {!state.formValidation.password && (
              <>
                <img src={ErrorIcon} alt="error" className="error-icon" />
                <span className="valid-error">{state.formErrors.password}</span>
              </>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={!state.isFormValid}
              className={state.isFormValid ? validFormClass : ""}
              onClick={handleSignup}
            >
              {" "}
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
