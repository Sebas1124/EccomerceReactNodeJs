
import { useContext } from 'react'
import { AuthContext } from './../auth/AuthContext';
import { NavbarComponent } from './../components/index/NavbarComponent';
import { FooterComponent } from './../components/index/FooterComponent';

export const ProfilePage = ({ isAuthenticated }) => {

  const { auth } = useContext( AuthContext );

  return(

    <>
      <NavbarComponent/>
      <div className="container">
        <div className="section">
            <div className="profile__content">
                <div className="profile__container">

                    <div className="profile__header">
                        <div className="profile__picture">
                            <img src={ auth.picture } alt="" />
                        </div>
                          <h1 className='section__title'>{ auth.name }</h1>
                    </div>


                    <div className="profile__info">

                      <h5 className="section__title">Email :</h5>
                      <h5 className="section__title">{ auth.email }</h5>

                    </div>

                    </div>
                </div>
           </div>
        </div>
      <FooterComponent/>
    </>
    
    
  )
  
}
