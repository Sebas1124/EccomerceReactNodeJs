import React from 'react'
import { useProducts } from '../../../hooks/useProducts';
import { ProductsTable } from './ProductsTable';
import { Slider } from './Slider';

export const ProductsIndex = () => {

  const { products } = useProducts();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Slider products={ products }/>
      <ProductsTable products={ products }/>
    </div>
  )
}
