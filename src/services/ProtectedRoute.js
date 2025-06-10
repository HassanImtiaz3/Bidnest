import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/user/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

export const VendorRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "vendor" ? <Outlet /> : <Navigate to="/" />;
};

export const UserRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "user" ? <Outlet /> : <Navigate to="/" />;
};

export const AdminRoute = () => {
  const adminToken = localStorage.getItem("adminToken");
  const location = useLocation();

  if (!adminToken) {
    // Redirect to home if no token
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
