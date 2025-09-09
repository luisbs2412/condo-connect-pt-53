import React from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Navigate } from 'react-router-dom';
import NotAuthorized from './NotAuthorized';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { store: { user } } = useGlobalReducer()

    if (!user) {
        return <Navigate to="/" replace />
    }
    if (!allowedRoles.includes(user.role)) {
        return <NotAuthorized />
    }
    return children
}

export default PrivateRoute;