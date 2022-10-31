import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './../../auth/AuthContext';

export const ContactComponent = () => {

    const { auth } = useContext( AuthContext )

    const history = useNavigate();

  return (
    <>
    <section className="newsletter section container">
        <div className="newsletter__bg grid">
            <div>
                <h2 className="newsletter__title">You need Help? <br/> Contact right NOW!</h2>
                    { ( auth.logged ) ? null : 'Please Login/Register in one account to Chat with the Admin! ;)' }
                <p className="newsletter__description">
                    Hey! If you need help please Chat with us! :D
                </p>
            </div>

            <form className="newsletter__subscribe">
                <button disabled={ ( auth.logged ) ? null : true } onClick={ () => history('/support-chat') } className="button">
                    Contact
                </button>
            </form>
        </div>
    </section>
    
    </>
  )
}
