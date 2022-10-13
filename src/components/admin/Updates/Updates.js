import React from "react";
import "./Updates.css";
import { useUsers } from './../../../hooks/useUsers';

const makeStyle=( status )=>{

  if( status )
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
      borderRadius: 50,
      border: '1px solid',
      padding: 2
    }
  }
  else if( !status )
  {
    return{
      background: '#ffadad8f',
      color: 'red',
      borderRadius: 50,
      border: '1px solid',
      padding: 2
    }
  }

}

const Updates = () => {

   const { users } = useUsers();

  return (
    <div className="Updates" style={{ top: 0 }}>
      {
        users.map( ( user ) => {
          return (
            <div className="update" key={ user._id }>
              <img style={ makeStyle( user.online ) } src={ user.picture } alt="profile" />
              <div className="noti">
                <div  style={{marginBottom: '0.5rem'}}>
                  <span>{ user.nombre }</span>
                  <span> { user.email }</span>
                </div>
                  <span>{ ( user.admin ) ? 'Admin' : 'Client' }</span>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default Updates;
