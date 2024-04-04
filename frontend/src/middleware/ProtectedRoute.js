import React from "react";
import { Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const isAuthorized = () => {
  const session = JSON.parse(localStorage.getItem("auth"));
  return session?.token;
};

const ProtectedRoutes = () => {
  const isAuth = isAuthorized();
  console.log(isAuth);
  return isAuth ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoutes;