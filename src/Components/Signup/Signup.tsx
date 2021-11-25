import React, { useState } from "react";
import { signup } from "../../APIs/UserAPIs";
import { useNavigate } from "react-router-dom";
import "./Signup.styles.scss";

const Signup = () => {
  let navigate = useNavigate();
  const [firstName, setFname] = useState("");
  const [middleName, setMname] = useState("");
  const [lastName, setLname] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidFname, setIsValidFname] = useState(true);
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value) {
      switch (name) {
        case "f-name":
          setFname(value);
          break;
        case "mid-name":
          setMname(value);
          break;
        case "l-name":
          setLname(value);
          break;
        case "p-code":
          setPromoCode(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "password":
          setPassword(value);
          break;
        default:
      }
    }
  };

  const handleSignup = () => {
    const userInfo = {
      firstName,
      middleName,
      lastName,
      promoCode,
      email,
      password,
    };
    signup(userInfo);
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
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="mid-name"
                placeholder="Middle Name"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              name="l-name"
              placeholder="Last Name *"
              onChange={handleChange}
              required
            />
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
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit" onClick={handleSignup}>
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
