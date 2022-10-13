
import { useContext, useState } from 'react';
import { CartShoppingComponent } from './CartShoppingComponent';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';

export const NavbarComponent = () => {

    const { auth, logout } = useContext( AuthContext );

    const [ toggleMenu, setToggleMenu ] = useState(false);

    const onHanddleMenu = () => {
        ( toggleMenu )
            ? setToggleMenu(false)
            : setToggleMenu(true)
    }


  return (
    <>
        <header className="header" id="header">
        <nav className="nav container">
            <Link to='/' className="nav__logo">
                <i className='bx bxs-watch nav__logo-icon'></i> SWatch
            </Link>

            <div className={`nav__menu ${ (toggleMenu) ? 'show-menu' : '' }`} id="nav-menu">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link to='/' className="nav__link active-link">Home</Link>
                    </li>
                    {
                        ( auth.logged )
                            ? <>
                                {( auth.admin )
                                    ? <li className="nav__item">
                                        <Link to='/admin' className="nav__link">Admin</Link>
                                      </li>
                                    : null
                                }
                                <li className="nav__item">
                                    <Link to={`/profile/${ auth.uid }`} className="nav__link">Profile</Link>
                                </li>
                                <li className="nav__item">
                                    <Link to='/' className="nav__link" onClick={ logout }>Logout</Link>
                                </li>
                              </>
                            : (
                                <>
                                <li className="nav__item">
                                    <Link to='/auth/login' className="nav__link">Login</Link>
                                </li>
                                <li className="nav__item">
                                    <Link to='/auth/register' className="nav__link">Register</Link>
                                </li>
                                </>
                              )
                              
                    }
                </ul>

                <div className="nav__close" id="nav-close">
                    <i className='bx bx-x' onClick={ () => setToggleMenu(false) } ></i>
                </div>
            </div>

            <CartShoppingComponent activeMenu={ onHanddleMenu }/>
            
        </nav>
        </header>

    </>
  )
}
