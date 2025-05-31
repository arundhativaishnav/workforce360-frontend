import React from 'react';
import { UseAuth } from '../src/context/authcontext';
import { Navigate } from 'react-router-dom';

const RolebasedRoutes = ({ children, requiredRole }) => {
    const { user, loading } = UseAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default RolebasedRoutes;
