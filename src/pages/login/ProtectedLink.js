import React from 'react';
import { Link } from 'react-router-dom';

const ProtectedLink = ({ to, children, roles }) => {
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

  if (!isAuthenticated() || (roles && !hasRole(roles))) {
    return null; 
  }

  return <Link to={to}>{children}</Link>;
};

export default ProtectedLink;
