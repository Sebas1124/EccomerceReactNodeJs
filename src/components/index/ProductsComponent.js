import React, { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext';
import { useCartShopping } from '../../hooks/useCartShopping';

export const ProductsComponent = () => {

    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'COP'
    });

   const { productState } = useContext( ProductsContext );

   const { addCart } = useCartShopping();

  return (
    <>
    <section className="products section container" id="products">
        <h2 className="section__title">
            Our Products
        </h2>

        <div className="products__container grid">

            {
                productState.productos.map( (product) => (
                    <article className="products__card" key={ product._id }>
                        <img src={ ( product.image ) ? require(`../../assets/img/${ product.image }`) : null } alt="" className="products__img"/>

                        <h3 className="products__title">{ product.Nombre }</h3>
                        <span className="products__price">${ formatter.format( product.Precio ) }</span>

                        <button className="products__button" onClick={ () => addCart( product ) }>
                            <i className='bx bx-shopping-bag'></i>
                        </button>
                    </article>
                ))
            }

        </div>


    </section>
    
    </>
  )
}
