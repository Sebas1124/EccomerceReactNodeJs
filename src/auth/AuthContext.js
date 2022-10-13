import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../context/ProductsContext';
import { fectSinToken, fetchConToken } from "../helpers/fetch";
import { useCartShopping } from '../hooks/useCartShopping';
import { types } from './../types/types';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
    picture: null,
    admin: false,
};


export const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState(initialState);
    const { dispatch } = useContext( ProductsContext );


    const login = async( email, password ) => {

      const resp = await fectSinToken('login', { email, password }, 'POST');

      if ( resp.ok ) {

        const { usuario } = resp;

        localStorage.setItem('token', resp.token);

        setAuth({
          uid: usuario._id,
          checking: false,
          logged: true,
          name: usuario.nombre,
          email: usuario.email,
          picture: usuario.picture,
          admin: usuario.admin,
        })

      }

      return resp.ok;
    }

    const register = async( nombre, email, password, picture ) => {
      const resp = await fectSinToken('login/new', { nombre, email, password, picture }, 'POST');

      if ( resp.ok ) {

        const { usuario } = resp;

        localStorage.setItem('token', resp.token);

        setAuth({
          uid: usuario._id,
          checking: false,
          logged: true,
          name: usuario.nombre,
          email: usuario.email,
          picture: usuario.picture,
          admin: false,
        })

      }
      
      return resp.ok;

    }

    const verificarToken = useCallback( async() => {

      const token = localStorage.getItem('token');

      //Si el token no existe
      if ( !token ) {
         setAuth({
          uid: null,
          checking: false,
          logged: false,
          name: null,
          email: null,
          picture: null,
          admin: false,
        })

        return false;
      }

      const resp = await fetchConToken('login/renew');

      if ( resp.ok ) {

        const { usuario } = resp;

        localStorage.setItem('token', resp.token);

        setAuth({
          uid: usuario._id,
          checking: false,
          logged: true,
          name: usuario.nombre,
          email: usuario.email,
          picture: usuario.picture,
          admin: usuario.admin,
        })
        
        return true;

      } else {
         setAuth({
          uid: null,
          checking: false,
          logged: false,
          name: null,
          email: null,
          picture: null,
          admin: false,
        })

        return false
      }
      
    }, []);

    const logout = () => {
        dispatch({
          type: types.LogoutCarrito,
          payload: []
        });

        localStorage.removeItem('token');

        setAuth({
          checking: false,
          logged: false,
        })
    }


  return (
    <AuthContext.Provider value={{ 
        login,
        register,
        verificarToken,
        logout,
        auth,
     }}>
        { children }
    </AuthContext.Provider>    
  )
}
