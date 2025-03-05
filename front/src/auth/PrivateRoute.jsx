import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // Si no hay token, redirige a la página pública
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
