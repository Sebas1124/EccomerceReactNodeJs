import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'

export const SearchBox = () => {

    const { auth, logout } = useContext( AuthContext )

  return (
    <div className="headind_srch">
        <div className="chat_img"> 
                <img style={{ borderRadius: 50 }} src={ auth.picture } alt="sunil" />
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }} className="recent_heading mt-2">
            <h4>{ auth.name }</h4>
        </div>
        <div className="srch_bar">
            <div className="stylish-input-group">
                <button 
                    onClick={ logout } 
                    className="btn text-danger">
                    Salir
                </button>
            </div>
        </div>
    </div>
  )
}
