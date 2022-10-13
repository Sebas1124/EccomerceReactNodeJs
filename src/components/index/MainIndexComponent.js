import React from 'react';
import { HomeComponent } from './HomeComponent';
import { FeaturesComponent } from './FeaturesComponent';
import { ProductsComponent } from './ProductsComponent';
import { ContactComponent } from './ContactComponent';
import { NavbarComponent } from './NavbarComponent';
import { FooterComponent } from './FooterComponent';


export const MainIndexComponent = () => {
  return (
    <div> 
        <NavbarComponent/>
        <HomeComponent/>
        <FeaturesComponent/>
        <ProductsComponent/>
        <ContactComponent/>
        <FooterComponent/>
    </div>
  )
}
