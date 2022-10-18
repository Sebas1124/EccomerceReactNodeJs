import React, { StrictMode } from 'react'
import { AuthProvider } from './auth/AuthContext';
import './App.css'

import { AppRouter } from './routes/AppRouter';
import { SocketProvider } from './context/SocketContext';
import { ProductProvider } from './context/ProductsContext';

export const App = () => {

  return (
      <ProductProvider>
        <AuthProvider>
            <SocketProvider>
              <AppRouter/>
            </SocketProvider>
        </AuthProvider>
      </ProductProvider>
  )
}
