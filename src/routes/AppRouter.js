import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { PublicRoutes } from './PublicRoutes';
import { MainIndexComponent } from './../components/index/MainIndexComponent';
import { ProfilePage } from './../pages/ProfilePage';
import { PrivateRoute } from './PrivateRoute';
import { useCartShopping } from '../hooks/useCartShopping';
import { SocketContext } from '../context/SocketContext';
import { PreloaderComponent } from '../components/Preloader/PreloaderComponent';
import { PaymentResult } from '../components/index/PaymentResult';
import { MainComponent } from '../components/404/MainComponent';
import { ChatRouteSegurity } from './ChatRouteSegurity';


export const AppRouter = () => {

  const { auth, verificarToken } = useContext( AuthContext );
  const { socket } = useContext( SocketContext );
  const { getCartsShopping } = useCartShopping();

  useEffect(() => {
    verificarToken();
  }, [ verificarToken ])
  
  useEffect(() => {
    socket?.on('lista-carrito', ( product ) => {
      getCartsShopping();
    });
  }, [ socket ])


  if ( auth.checking ) {
    return <PreloaderComponent/>
  }

  return (
    <BrowserRouter>
            <div className="main">
                <Routes>
                  <Route exact path='/' element={ <MainIndexComponent isAuthenticated={ auth.logged }/> }/>
                  <Route path='/feedback/*' exact element={ <PaymentResult/> }/>
                  <Route path='/support-chat' exact element={ <ChatRouteSegurity isAuthenticated={ auth.logged }/> }/>
                  <Route exact path={`/profile/${ auth.uid }`} element={ <ProfilePage isAuthenticated={auth.logged}/> }/>
                  <Route exact path='/auth/*' element={ <PublicRoutes isAuthenticated={auth.logged}/> }/>
                  <Route exact path='/admin/*' element={ <PrivateRoute isAdmin={ auth.admin }/> }/>
                  <Route path='/*' element={ <MainComponent/> }/>
                </Routes>
            </div>
    </BrowserRouter>
  )
}
