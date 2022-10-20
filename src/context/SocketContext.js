import React, { useContext, useEffect, createContext } from 'react';
import { useSocket } from '../hooks/useSocket.js'
import { types } from '../types/types.js';
import { AuthContext } from './../auth/AuthContext';
import { ChatContext } from './ChatContext.js';
import { ScrollToBottomAnimated } from '../helpers/ScrollToBottom.js';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket, client, clientSocket } = useSocket('http://localhost:8080');

    const { auth } = useContext( AuthContext );

    const { dispatch } = useContext( ChatContext );


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

    //Escuchar los cambios en los usuarios conectados

    useEffect(() => {

      socket?.on( 'lista-usuarios', (usuarios) => {
          dispatch({
            type: types.usuariosCargados,
            payload: usuarios
          })
      });

    }, [ socket, dispatch ])
    
    //Escuchar mensajes personales
    
    useEffect(() => {
      socket?.on('mensaje-personal', (mensaje) => {
          dispatch({
            type: types.nuevoMensaje,
            payload: mensaje
          });

          ScrollToBottomAnimated('mensajes');

      });
    }, [ socket, dispatch ])
        
    
    return (
        <SocketContext.Provider value={{ socket, online, client, clientSocket }}>
            { children }
        </SocketContext.Provider>
    )
}