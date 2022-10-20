import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { horaMes } from '../../helpers/horaMes';

export const IncomingMessage = ({ msg }) => {

 const { auth } =  useContext( AuthContext )

  return (
    <div className="incoming_msg">
        <div className="incoming_msg_img">
          {
              ( auth.admin )
                ?<img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                :<img src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?w=740&t=st=1664227819~exp=1664228419~hmac=e77cf8cdd5918a3a29000afc179cf83a2311b393dd3089026abdc62c24838221" alt="sunil" />
          }
        </div>
        <div className="received_msg">
            <div className="received_withd_msg">
                <p>{ msg.mensaje }</p>
                <span className="time_date">{ horaMes( msg.createdAt ) }</span>
            </div>
        </div>
    </div>
  )
}
