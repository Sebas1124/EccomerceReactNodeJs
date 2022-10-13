import React, { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext';
import { useCartShopping } from '../../hooks/useCartShopping';

export const HomeComponent = () => {

    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'COP'
    });

   const { productState } = useContext( ProductsContext );
   const { addCart } = useCartShopping();

  return (
    <>
        {
            productState.MostStock?.map( ( product ) => 
            (
            <section className="home" id="home" key={ product._id }>
                <div className="home__container container grid">
                <div className="home__img-bg">
                    <img src={ ( product.image ) ? require(`../../assets/img/${ product.image }`) : null } alt="" className="home__img"/>
                </div>

                <div className="home__social">
                    <a href="https://www.facebook.com/" rel="noopener noreferrer" target="_blank" className="home__social-link">
                        Facebook
                    </a>
                    <a href="https://twitter.com/" rel="noopener noreferrer" target="_blank" className="home__social-link">
                        Twitter
                    </a>
                    <a href="https://www.instagram.com/" rel="noopener noreferrer" target="_blank" className="home__social-link">
                        Instagram
                    </a>
                </div>

                <div className="home__data">

                    <h1 className="home__title"> 2022 <br/>{ product.Nombre }</h1>
                    <span className="home__price">${ formatter.format(product.Precio) }</span>
                    <p className="home__description">
                        The product with MOST Stock!! :D <br />
                        <strong>Stock: { product.stock }</strong> 
                    </p>
                    <div className="home__btns">
                        <a href="/#" className="button button--gray button--small">
                            Discover
                        </a>

                        <button className="button home__button" onClick={ () => addCart( product ) }>ADD TO CART</button>
                    </div>

                </div>
            </div>
            </section>
            ))
        }
    
    </>
  )
}
