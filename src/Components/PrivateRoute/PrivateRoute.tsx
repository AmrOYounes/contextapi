import React from "react";
import {userContext } from "../../App";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const { isAuth } = React.useContext(userContext);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
