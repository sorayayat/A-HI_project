import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const userInfo = sessionStorage.getItem('userInfo');
  return userInfo != null;
};

const hasRole = (requiredRoles) => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  if (!userInfo) {
    return false;
  }
  return requiredRoles.includes(userInfo.role);
};

export const ProtectedRoute = ({ children, roles }) => { 
  if (!isAuthenticated()) {
    return <Navigate to="/loginForm" />;
  }

  if (roles && !hasRole(roles)) { 
    return <Navigate to="/" />;
  }

  return children;
};
