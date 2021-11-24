import React, {useState} from "react";
import "./Login.styles.scss";
import { FORMLOGO } from "../../consts";
import CardImage from "../../assets/images/card.png";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { isUser } from "../../APIs/UserAPIs";

const Login = () => {
  const navigate = useNavigate();
  const { toggleAuth } = React.useContext(userContext);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.target;
    type === "email" ? setUsername(value) : setPassword(value);
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
              />
            </div>
            <div>
              <input
                type="password"
                name="email"
                placeholder="Password *"
                onChange={handlechange}
                required
              />
            </div>
            <div>
              <button type="submit" onClick={handleLogin}>
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
