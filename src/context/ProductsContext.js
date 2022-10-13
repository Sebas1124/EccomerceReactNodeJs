import React, { createContext, useReducer } from "react";
import { ProductReducer } from "./ProductReducer";

export const ProductsContext = createContext();

const initialState = {
    productos: [],
    MostStock: [],
    Featured: [],
    carrito: [],
}

export const ProductProvider = ({ children }) => {

  const [ productState, dispatch ] = useReducer( ProductReducer, initialState);

  return (
    <ProductsContext.Provider value={{ 
             productState,
             dispatch
         }}>

        {children}
    </ProductsContext.Provider>
  )
}

