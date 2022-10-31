import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";


export const useUsers = () => {

    const [ users, setUsers ] = useState([]);
    const { socket } = useContext( SocketContext );

    useEffect(() => {
        socket?.on( 'lista-usuarios', (usuarios) => {
            setUsers( usuarios )
        });
      }, [ socket ])

    return {
        users
    }

}
