import React, { useContext } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import  jwt_decode  from 'jwt-decode';
import { AuthContext } from './../auth/AuthContext';
import Swal from 'sweetalert2';


export const RegisterPage = () => {

  const { register } = useContext( AuthContext )

  const onGoogleLogin = async(response) => {

    var { given_name, family_name, email, picture } = jwt_decode(response.credential);
    const fullName = `${given_name} ${family_name}`

    const ok = await register( fullName, email, '123456789', picture );
    
    if ( !ok ) {
			Swal.fire('Error', 'El usuario ya existe', 'error')
	}

  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
  <>
  <div className="container">
      <div className="section">
          <div className="form__content">
              <div className="form__container">

                  <div className="form__header">
                      <h2 className='section__title'>Hi! Welcome, Register in SWatch</h2>
                  </div>

                  <div className="form__inputs">

                  <GoogleOAuthProvider clientId="76843581765-1i3l367gmut57cjakun9mqaho3i814g7.apps.googleusercontent.com">
                      <GoogleLogin
                      clientId="76843581765-1i3l367gmut57cjakun9mqaho3i814g7.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={onGoogleLogin}
                      onFailure={onFinishFailed}
                      cookiePolicy={'single_host_origin'}
                      />,
                  </GoogleOAuthProvider>

                  </div>

              </div>
          </div>
      </div>
  </div>
  </>
  )
}
