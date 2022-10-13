import React from 'react'
import { Navigate } from 'react-router';
import { AuthRouter } from './AuthRouter';

export const PublicRoutes = ({ isAuthenticated }) => {
    return !isAuthenticated ? <AuthRouter /> : <Navigate to="/" replace/>;
}
