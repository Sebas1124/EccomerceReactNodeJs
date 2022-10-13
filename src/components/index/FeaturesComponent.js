import React, { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext';
import { useCartShopping } from './../../hooks/useCartShopping';

export const FeaturesComponent = () => {

    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'COP'
    });

   const { productState } = useContext( ProductsContext );
   const { addCart } =  useCartShopping();

  return (
    <>
        <section className="featured section container" id="featured">
            <h2 className="section__title">
                Featured
            </h2>

            <div className="featured__container grid">
            {
                productState.Featured.map( ( product ) => (
                <article className="featured__card" key={ product._id }>
                    <span className="featured__tag">Recommended</span>

                    <img src={ ( product.image ) ? require(`../../assets/img/${ product.image }`) : null } alt="" className="featured__img"/>

                    <div className="featured__data">
                        <h3 className="featured__title">{ product.Nombre }</h3>
                        <span className="featured__price">${ formatter.format( product.Precio ) }</span>
                    </div>

                    <button className="button featured__button" onClick={ () => addCart( product ) }>ADD TO CART</button>
                </article>
                ))
            }
            </div>

        </section>
    
    </>
  )
}
