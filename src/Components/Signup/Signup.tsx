import React, {useEffect} from "react";
import { signup } from "../../APIs/UserAPIs";
import { useNavigate } from "react-router-dom";
import {setInputValidStatus, resetInputField, setIsSignupFormValid} from '../../AppReducer/action';
import { userContext } from "../../App";
import ErrorIcon from "../../assets/images/error.png";
import {errorFieldClass, validFormClass} from './../../consts';
import "./Signup.styles.scss";

const Signup = () => {
   
  const {state,dispatch} = React.useContext(userContext);
 const {firstName,lastName,email,password,isFirstNameValid, isLastNameValid, isSignupFormValid,isMiddleNameValid, formErrors} = state;
  let navigate = useNavigate();
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      dispatch(setInputValidStatus(name, value))
}
   useEffect ( ()=> {
    vaildForm();
   },[firstName, lastName, email, password]) 

const vaildForm = () => {
  dispatch(setIsSignupFormValid())
 };

  const handleSignup = () => {
    const userInfo = {
      firstName,
      lastName,
      email,
      password,
    };
    // signup(userInfo);
    navigate("/login");
  };
 
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
                name="f-name"
                placeholder="First Name *"
                onChange={handleChange}
                className={ isFirstNameValid? "" : errorFieldClass}
                required
              />
               {! isFirstNameValid && (
              <>
                <img src={ErrorIcon} alt="error" className="error-icon" />
                <span className="valid-error">{formErrors.fName}</span>
              </>
            )}
            </div>
            <div>
              <input
                type="text"
                name="mid-name"
                placeholder="Middle Name"
                onChange={handleChange}
                className={ isMiddleNameValid? "" : errorFieldClass}
                required
              />
              {! isMiddleNameValid && (
              <>
                <img src={ErrorIcon} alt="error" className="error-icon" />
                <span className="valid-error">{formErrors.mName}</span>
              </>
            )}
            </div>
          </div>
          <div>
            <input
              type="text"
              name="l-name"
              placeholder="Last Name *"
              onChange={handleChange}
              className={ isLastNameValid ? "" : errorFieldClass}
              required
            />
              {! isLastNameValid && (
              <>
                <img src={ErrorIcon} alt="error" className="error-icon" />
                <span className="valid-error">{formErrors.lName}</span>
              </>
            )}
          </div>
          <div>
            <input
              type="text"
              name="p-code"
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
              className={ state.isEmailValid ? "" : errorFieldClass}
              required
            />
              {!state.isEmailValid && (
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
              className={state.ispasswordValid ? "" : errorFieldClass}
              required
            />
            {!state.ispasswordValid && (
              <>
                <img src={ErrorIcon} alt="error" className="error-icon" />
                <span className="valid-error">{state.formErrors.password}</span>
              </>
            )}
          </div>
          <div>
            <button type="submit" onClick={handleSignup} disabled={!isSignupFormValid} className={isSignupFormValid ? validFormClass : ""}>
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
