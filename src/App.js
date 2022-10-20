import React, { StrictMode } from 'react'
import { AuthProvider } from './auth/AuthContext';
import './App.css'

import { AppRouter } from './routes/AppRouter';
import { SocketProvider } from './context/SocketContext';
import { ProductProvider } from './context/ProductsContext';
import { ChatProvider } from './context/ChatContext';

export const App = () => {

  return (
      <ProductProvider>
        <ChatProvider>
          <AuthProvider>
              <SocketProvider>
                <AppRouter/>
              </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </ProductProvider>
  )
}
