import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../context/SocketContext"
import { fectSinToken } from "../helpers/fetch";
import { ProductsContext } from './../context/ProductsContext';
import { types } from './../types/types';

export const useProducts = () => {

    const [ mostStock] = useState([]);
    const [ products, setProducts ] = useState([]);
    const { socket } = useContext( SocketContext );
    const { dispatch } = useContext( ProductsContext );

    useEffect(() => {
        socket?.on('most-stock', ( product ) => {
            dispatch({
              type: types.MostStock,
              payload: product
            })
        });
    }, [ socket, dispatch ])

    useEffect(() => {
      getProducts();
    }, [ socket ])
    

    const getProducts = async() => {

      const Allproducts = await fectSinToken('productos/show')
      const { products } = Allproducts;

      setProducts( products )
  
    }

    
  return {
    mostStock,
    products
  }
}
