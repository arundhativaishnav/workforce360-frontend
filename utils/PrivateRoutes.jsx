import React from 'react';
import { UseAuth } from '../src/context/authcontext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const { user, loading } = UseAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
