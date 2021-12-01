import React, {useEffect } from "react";
import "./Login.styles.scss";
import { FORMLOGO } from "../../consts";
import CardImage from "../../assets/images/card.png";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { isUser } from "../../APIs/UserAPIs";
import ErrorIcon from "../../assets/images/error.png";
import { validate } from "../../utils/utils";
import {
  toggleAuth,
  setUser,
  setInputValidStatus,
  setIsValidForm,
  resetInputField,
} from "../../AppReducer/action";
import { errorFieldClass, validFormClass } from "../../consts";

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = React.useContext(userContext);
  const { email, password, isEmailValid, ispasswordValid, isformValid } = state;

  useEffect(() => {
    vaildForm();
  }, [isEmailValid, ispasswordValid]);

  useEffect(() => {
    return () => dispatch(resetInputField());
  }, []);
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setInputValidStatus(name, value));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      isUser(email, password).then((res) => {
        if (res) {
          dispatch(toggleAuth());
          navigate("/");
          localStorage.setItem("Auth-token", "test");
          localStorage.setItem("email", email);
        }
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setInputValidStatus(name, value));
  };

  const vaildForm = () => {
    dispatch(setIsValidForm());
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="form-header">
          <div className="form-logo">
            <img src={FORMLOGO} alt="form-logo" />
          </div>
          <div className="form-card">
            <img src={CardImage} alt="card-image" />
          </div>
          <div className="form-title">Welcome back!</div>
        </div>
        <div className="horizantal-seperator">Or</div>
        <div className="form-content">
          <form>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                onChange={handlechange}
                onBlur={handleBlur}
                className={state.isEmailValid ? "" : errorFieldClass}
              />
            </div>
            {!state.isEmailValid && (
              <>
                <img src={ErrorIcon} alt="error" className="error-icon" />
                <span className="valid-error">{state.formErrors.email}</span>
              </>
            )}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password *"
                onChange={handlechange}
                onBlur={handleBlur}
                className={state.ispasswordValid ? "" : errorFieldClass}
                required
              />
            </div>
            {!state.ispasswordValid && (
              <>
                <img src={ErrorIcon} alt="error" className="error-icon" />
                <span className="valid-error">{state.formErrors.password}</span>
              </>
            )}
            <div>
              <button
                type="submit"
                onClick={handleLogin}
                disabled={!isformValid}
                className={isformValid ? validFormClass : ""}
              >
                {" "}
                LOG IN
              </button>
            </div>
          </form>
        </div>
        <div className="sign-up">
          <Link to="/register"> Or Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
