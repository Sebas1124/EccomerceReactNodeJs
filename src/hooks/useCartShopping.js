import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../auth/AuthContext";
import { SocketContext } from "../context/SocketContext";
import { fectSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { ProductsContext } from './../context/ProductsContext';


export const useCartShopping = () => {

  const [ carts, setCarts ] = useState([]);
  
  const { auth } = useContext( AuthContext );
  const { socket, client } = useContext( SocketContext );
  const { dispatch } = useContext( ProductsContext );

  useEffect(() => {
    localStorage.setItem('Cart', JSON.stringify(carts))
    dispatch({
      type: types.AñadirCarrito,
      payload: carts
    })
  }, [ carts ])


  const getCartsShopping = async() => {

    if ( auth.logged ) {

      const CartsShopping = await fectSinToken('productos/getCart', { "uid": auth.uid }, "POST")
      const { carrito } = CartsShopping;

      dispatch({
        type: types.AñadirCarrito,
        payload: carrito
      })

    }

  }

  const addCart = async( product ) => {

    const { Nombre, Precio, image, _id } = product

    if( auth.logged ){
      await socket?.emit('addCart',{
            "uid":              auth.uid,
            "idProduct":        _id,
            "image":            image,
            "Nombre":           Nombre,
            "PrecioBase":       Precio,
            "PrecioCarrito":    Precio,
            "CantidadCarrito":  1
            });
    }else {
      const inCart = carts.find( 
        ( productInCart ) => productInCart._id === product._id 
      );

      if ( inCart ) {
        setCarts(
          carts.map( ( productInCart ) => {
            if ( productInCart._id === product._id ) {
              return { ...inCart, CantidadCarrito: inCart.CantidadCarrito + 1, PrecioCarrito: inCart.PrecioCarrito + inCart.PrecioBase }
            }else return productInCart
          })
        );

      }else {
        setCarts([ ...carts, { 
          "_id":              _id,
          "image":            image,
          "Nombre":           Nombre,
          "PrecioBase":       Precio,
          "PrecioCarrito":    Precio,
          "CantidadCarrito":  1 
          } 
        ])
        
      }
    }

  }

  const deleteCart = ( product ) => {

    const { Nombre, PrecioCarrito, PrecioBase, CantidadCarrito, image, _id } = product

    if ( auth.logged ) {

      socket?.emit('deleteProductFromCart',{
        "uid":              auth.uid,
        "idProduct":        _id,
        "image":            image,
        "Nombre":           Nombre,
        "PrecioBase":       PrecioBase,
        "PrecioCarrito":    PrecioCarrito,
        "CantidadCarrito":  CantidadCarrito
      });

    }else {
      setCarts(
        carts.filter( (ProductInCart) => ProductInCart._id !== product._id)
      );
    }

  }

  const restCart = ( product ) => {

    const { Nombre, PrecioCarrito, PrecioBase, CantidadCarrito, image, _id } = product

    if ( auth.logged ) {
      socket?.emit('restCart',{
        "uid":              auth.uid,
        "idProduct":        _id,
        "image":            image,
        "Nombre":           Nombre,
        "PrecioBase":       PrecioBase,
        "PrecioCarrito":    PrecioCarrito,
        "CantidadCarrito":  1
      });

    }else {
    };

  }

  const sumCart = ( product ) => {

    const { Nombre, PrecioCarrito, PrecioBase, CantidadCarrito, image, _id } = product


    if ( auth.logged ) {
      socket?.emit('sumCart',{
        "uid":              auth.uid,
        "idProduct":        _id,
        "image":            image,
        "Nombre":           Nombre,
        "PrecioBase":       PrecioBase,
        "PrecioCarrito":    PrecioCarrito,
        "CantidadCarrito":  1
      });

    }else {
      console.log('xd')
    }

  }

  return {
    addCart,
    deleteCart,
    restCart,
    sumCart,
    getCartsShopping,
    carts
  }
  
}
