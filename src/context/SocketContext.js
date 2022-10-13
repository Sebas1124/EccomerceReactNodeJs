import React, { useContext, useEffect, createContext } from 'react';
import { fectSinToken } from '../helpers/fetch.js';
import { useSocket } from '../hooks/useSocket.js'
import { types } from '../types/types.js';
import { AuthContext } from './../auth/AuthContext';
import { ProductsContext } from './ProductsContext';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket, client, clientSocket } = useSocket('http://localhost:8080');

    const { auth } = useContext( AuthContext );


    useEffect(() => {
      if ( auth.logged ) {
          conectarSocket();
      }
    }, [ auth, conectarSocket ])

    useEffect(() => {
      if ( !auth.logged ) {
            desconectarSocket();
      }
    }, [ auth, desconectarSocket ])


    
    return (
        <SocketContext.Provider value={{ socket, online, client, clientSocket }}>
            { children }
        </SocketContext.Provider>
    )
}