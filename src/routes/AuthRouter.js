
import { Routes, Route } from 'react-router-dom';
import { NavbarComponent } from '../components/index/NavbarComponent';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { FooterComponent } from './../components/index/FooterComponent';
export const AuthRouter = () => {
  return (
    <>
    <NavbarComponent/>
      <Routes>
          <Route path='/login' element={ <LoginPage/> }></Route>
          <Route path='/register' element={ <RegisterPage/> }></Route>
          <Route path="*" element={<h1>404</h1>}></Route>
      </Routes>
    <FooterComponent/>
    </>
  )
}
