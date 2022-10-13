import React from 'react'
import Sidebar from './../sidebar/Sidebar';
import MainDash from './../mainDash/MainDash';
import RightSide from './../RigtSide/RightSide';

import './dashboard.css'
import { Routes, Route } from 'react-router-dom';
import { UsersIndex } from '../users/UsersIndex';
import { ProductsIndex } from '../products/ProductsIndex';
import { SalesIndex } from './../sales/SalesIndex';

export const AdminIndex = () => {
  return (
    <div className='App'>
      <div className="AppGlass">
        <Sidebar/>
          <Routes>
            <Route exact path='/' element={ <MainDash/> }/>
            <Route path='/users' element={ <UsersIndex/> }/>
            <Route path='/products' element={ <ProductsIndex/> }/>
            <Route path='/sales' element={ <SalesIndex/> }/>
            {/* <Route path='/admin/users' element={ <MainDash/>  }/> */}
          </Routes>
        <RightSide/>
      </div>
    </div>
  )
}
