import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/user/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

export const VendorRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.role === 'vendor' ? <Outlet /> : <Navigate to="/" />;
};

export const UserRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.role === 'user' ? <Outlet /> : <Navigate to="/" />;
};