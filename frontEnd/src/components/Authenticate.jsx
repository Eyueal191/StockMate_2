// Authenticate.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const Authenticate = ({ children }) => {
  const isLoggedIn = localStorage.getItem("IsLoggedIn");

  // If user is not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected children
  return children;
};
export default Authenticate;
