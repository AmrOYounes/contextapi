import React from "react";
import {userContext } from "../../App";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute: React.FC = () => {
  const {state,dispatch} = React.useContext(userContext);  
  return state.isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
