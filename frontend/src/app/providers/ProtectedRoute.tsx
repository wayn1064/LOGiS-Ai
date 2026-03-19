import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
