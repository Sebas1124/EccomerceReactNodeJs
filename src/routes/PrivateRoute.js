import React from 'react'
import { Navigate } from 'react-router-dom';
import { AdminIndex } from './../components/admin/index/AdminIndex';

export const PrivateRoute = ({ isAdmin }) => {
    return isAdmin ? <AdminIndex /> : <Navigate to="/" replace/>;
}
