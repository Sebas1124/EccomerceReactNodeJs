import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { fetchConToken } from '../../helpers/fetch';
import { ScrollToBottom } from '../../helpers/ScrollToBottom';
import { types } from '../../types/types';

export const SidebarChatItem = ({ usuario }) => {

  const { chatState, dispatch } = useContext( ChatContext )

  const { auth } = useContext( AuthContext )

  const { chatActivo } = chatState;

  const onClick = async() => {

    dispatch({
      type: types.activarChat,
      payload: usuario._id
    })

    //cargar los mensajes del chat

    const resp = await fetchConToken(`mensajes/${usuario._id}`);
    const { mensajes } = resp;
    dispatch({
      type: types.cargarMensajes,
      payload: mensajes
    })

    ScrollToBottom('mensajes');
  }

  console.log(usuario.picture)

  return (
    <div 
      onClick={ onClick } 
      className={`chat_list ${ (usuario._id === chatActivo) && 'active_chat' }`}
      >
        <div className="chat_people">
            <div className="chat_img"> 
                <img style={{ borderRadius: 50 }} src={ usuario.picture } alt="Profile Pic" />
            </div>
            <div className="chat_ib">
                <h5>{ usuario.nombre }</h5>
                {
                  ( usuario.online )
                    ?<span className="text-success">Online</span>
                    :<span className="text-danger">Offline</span>
                }   
            </div>
        </div>
    </div>
  )
}
