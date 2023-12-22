import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Auth/Login";
import Homepage from "./Components/Homepage";
import "./index.css";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null && token !== undefined;
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: "/" }} />
  );
};

const App = () => {
  return (
    <Routes>
      {/* Protected Route */}
      <Route
        path="/homepage"
        element={<PrivateRoute element={<Homepage />} />}
      />

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Default Redirect to Login */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
