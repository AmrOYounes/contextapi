import React, { useState, useEffect } from "react";
import "./Login.styles.scss";
import { FORMLOGO } from "../../consts";
import CardImage from "../../assets/images/card.png";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { isUser } from "../../APIs/UserAPIs";
import ErrorIcon from "../../assets/images/error.png";
import {Validate} from '../../utils/utils';

const errorFieldClass = "error-feild";
const validFormClass = "valid-form";
const Login = () => {
  const navigate = useNavigate();
  const { toggleAuth } = React.useContext(userContext);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailVaild] = useState(true);
  const [ispasswordValid, setIsPasswordValid] = useState(true);
  const [isformValid, setIsFormVaild] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    
    vaildForm();
  }, [isEmailValid, ispasswordValid]);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;
    if (type === "email") {
      setUsername(value);
      ValidateField(name, value);
    } else {
      setPassword(value);
      ValidateField(name, value);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName && password) {
      isUser(userName, password).then((res) => {
        if (res) {
          toggleAuth();
          navigate("/");
          localStorage.setItem("Auth-token", "test");
          localStorage.setItem("email", userName);
        }
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    ValidateField(name, value);
  };

  const vaildForm = () => {
    if (isEmailValid && ispasswordValid && userName && password) {
      setIsFormVaild(true);
    } else setIsFormVaild(false);
    // setIsFormVaild(ispasswordValid && isEmailValid )
  };

  const ValidateField = (type: string, value: string) => {
    let emailValid = isEmailValid;
    let validPassword = ispasswordValid;
    switch (type) {
      case "email":
        if (value === "") {
          formErrors.email = "Required";
          setIsEmailVaild(false);
        } else {
          emailValid =  Validate('email', value) as boolean;
          if (!emailValid) formErrors.email = "Not valid email";
          setIsEmailVaild(emailValid);
        }

        break;
      case "password":
        if (value === "") {
          formErrors.password = "Required";
          setIsPasswordValid(false);
        } else {
          validPassword = Validate('password', value) as boolean;
          if (!validPassword) formErrors.password = "Not Valid Password";
          setIsPasswordValid(validPassword);
        }
    }
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
                className={isEmailValid ? "" : errorFieldClass}
              />
            </div>
            {!isEmailValid && (
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
                className={ispasswordValid ? "" : errorFieldClass}
                required
              />
            </div>
            {!ispasswordValid && (
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
