import PrivateRoute from "../PrivateRoute";
import UserInfo from "../UserInfo";
import Login from "../Login";
import Signup from "../Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<UserInfo />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default Routing;
