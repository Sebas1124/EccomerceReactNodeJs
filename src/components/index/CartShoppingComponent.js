import React, { useContext, useEffect, useState } from 'react'
import { useCartShopping } from '../../hooks/useCartShopping';
import { ProductsContext } from './../../context/ProductsContext';
import { AuthContext } from './../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { History } from 'swiper';
import { PaymentComponent } from './PaymentComponent';

export const CartShoppingComponent = ({ activeMenu }) => {

    const [ cartShopping, setCartShopping ] = useState(false);
    const { deleteCart, restCart, sumCart, getCartsShopping} = useCartShopping();
    const { productState } = useContext( ProductsContext );
    const { auth } = useContext( AuthContext );
    const [ pay, setPay ] = useState(false)

    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'COP'
    });

    const showCartShopping = () => {
        ( cartShopping )
            ? setCartShopping(false)
            : setCartShopping(true)
        getCartsShopping();
    }

    const total = productState.carrito.reduce(
        (acumulador, actual) => acumulador + actual.PrecioCarrito, 0);
    
    const Checkout = () => {
        setPay(true)
    }

  return (
    <>
        <div className="nav__btns">

            <div className='nav__shop' id='cart-shop'>
                <i className='bx bx-shopping-bag' onClick={ showCartShopping }></i>
            </div>

            <div className="nav__toggle" id="nav-toggle">
                <i className='bx bx-grid-alt' onClick={ activeMenu }></i>
            </div>
        </div>

        <div className={`cart ${ ( !cartShopping ) ? '' : 'show-cart' }`} id="cart">
            <i className='bx bx-x cart__close' id="cart-close" onClick={ () => setCartShopping(false) }></i>

            <h2 className="cart__title-center">My Cart</h2>

            <div className="cart__container">

                {
                    productState.carrito?.map( (cart) => (
                    <article className="cart__card" key={ cart._id }>
                        <div className="cart__box">
                            <img src={ ( cart.image ) ? require(`../../assets/img/${ cart.image }`) : null } alt="" className="cart__img"/>
                        </div>

                        <div className="cart__details">
                            <h3 className="cart__title">{ cart.Nombre }</h3>
                            <span className="cart__price">${ formatter.format( cart.PrecioCarrito ) }</span>

                            <div className="cart__amount">
                                <div className="cart__amount-content">
                                    <span className="cart__amount-box" onClick={ () => restCart( cart ) }>
                                        <i className='bx bx-minus'></i>
                                    </span>

                                    <span className="cart__amount-number">{ cart.CantidadCarrito }</span>

                                    <span className="cart__amount-box" onClick={ () => sumCart( cart ) }>
                                        <i className='bx bx-plus'></i>
                                    </span>
                                </div>

                                <i className='bx bx-trash-alt cart__amount-trash' onClick={ () => deleteCart( cart ) }></i>
                            </div>
                        </div>
                    </article> 
                    ))     
                }

            </div>

            <div className="cart__prices">
                <span className="cart__prices-item"><strong>{ productState.carrito?.length }</strong> Products</span>
                <span className="cart__prices-total">${ formatter.format( total ) }</span>
            </div>

            <div style={{ marginTop: 50, left: 50, position: 'absolute', display: 'flex', justifyContent: 'space-between' }}>
                <button
                style={{ marginRight: 50 }}
                 disabled={ ( auth.logged ) ? false : true } 
                 className={ ( auth.logged ) ? `button home__button` : 'button button--gray button--small'} 
                 onClick={ Checkout }>
                    Chekout
                </button>
                { (pay) ? <PaymentComponent items={ productState.carrito }/> : null }
            </div>
        </div>
    </>
  )
}
