/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect } from "react";
import { setUser } from "../redux/features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  useEffect(() => {    
    if (token) {
      const decode = jwtDecode(token);
      dispatch(setUser({ user: decode, token: token }));
    }
  }, [dispatch, navigate, token]);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
