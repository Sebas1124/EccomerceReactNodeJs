import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { InboxPeople } from './InboxPeople';
import { Messages } from './Messages';
import { ChatSelect } from './ChatSelect';

import './chatStyle.css';

export const MainChat = () => {

    const { chatState } = useContext( ChatContext )

  return (
    <div className="messaging">
        <div className="inbox_msg">

            <InboxPeople/>

            {
              ( chatState.chatActivo )
                ? <Messages/>
                : <ChatSelect/>
            }

        </div>


    </div>
  )
}
