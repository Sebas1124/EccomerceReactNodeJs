import React from 'react'
import { FooterComponent } from '../index/FooterComponent'
import { NavbarComponent } from '../index/NavbarComponent'
import { NotFoundPage } from './NotFoundPage';

import './NotFound.css';


export const MainComponent = () => {

  return (
    <>
        <NavbarComponent/>
        <NotFoundPage/>
        <FooterComponent/>
    </>
  )
}
