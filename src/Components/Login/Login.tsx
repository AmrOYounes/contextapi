import React, { useEffect, useState, useReducer } from "react";
import "./Login.styles.scss";
import { FORMLOGO } from "../../consts";
import CardImage from "../../assets/images/card.png";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { isUser } from "../../APIs/UserAPIs";
import ErrorIcon from "../../assets/images/error.png";
import { validate } from "../../utils/utils";
import { toggleAuth } from "../../Store/action";
import { errorFieldClass, validFormClass } from "../../consts";

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = React.useContext(userContext);

  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [formInputsValidation, setFomInputsValidation] = useState({
    email: true,
    password: true,
  });
  const [isformValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErros] = useState({ email: "", password: "" });

  useEffect(() => {
    setIsFormValid(
      !!(
        formInputsValidation.email &&
        formInputsValidation.password &&
        email &&
        password
      )
    );
  }, [formInputsValidation.email, formInputsValidation.password]);

  const validateInputField = (type: string, value: string) => {
    let formValidationCopy: any = { ...formInputsValidation };
    let formErrorCopy: any = { ...formErrors };

    if (!value) {
      formValidationCopy[type] = false;
      formErrorCopy[type] = "Required";
      setFomInputsValidation(formValidationCopy);
      setFormErros(formErrorCopy);
    } else {
      if (validate(type, value)) {
        formValidationCopy[type] = true;
        setFomInputsValidation(formValidationCopy);
      } else {
        formValidationCopy[type] = false;
        formErrorCopy[type] = "Not Valid";
        setFomInputsValidation(formValidationCopy);
        setFormErros(formErrorCopy);
      }
    }
  };

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.target;
    switch (type) {
      case "email":
        setEamil(value);
        break;
      case "password":
        setPassword(value);
        break;
    }

    validateInputField(type, value);
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
    const { type, value } = e.target;
    validateInputField(type, value);
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
                className={formInputsValidation.email ? "" : errorFieldClass}
              />
            </div>
            {!formInputsValidation.email && (
              <>
                <img src={ErrorIcon} alt="error" className="error-icon" />
                <span className="valid-error">{formErrors.email}</span>
              </>
            )}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password *"
                onChange={handlechange}
                onBlur={handleBlur}
                className={formInputsValidation.password ? "" : errorFieldClass}
                required
              />
            </div>
            {!formInputsValidation.password && (
              <>
                <img src={ErrorIcon} alt="error" className="error-icon" />
                <span className="valid-error">{formErrors.password}</span>
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
