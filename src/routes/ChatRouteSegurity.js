import React from 'react'
import { Navigate } from 'react-router-dom';
import { MainChat } from './../components/Chat/MainChat';

export const ChatRouteSegurity = ({ isAuthenticated }) => {
    return isAuthenticated ? <MainChat /> : <Navigate to="/" replace/>;
}
