import { useCallback, useEffect, useState, useContext, useMemo } from 'react';
import io from 'socket.io-client';
import { ProductsContext } from './../context/ProductsContext';
import { types } from './../types/types';

export const useSocket = ( serverPath ) => {

    
    const [ socket, setSocket ] = useState(null);
    const [ online, setOnline ] = useState(false);
    const [ clientSocket, setClientSocket ] = useState(false);
    const { dispatch } = useContext( ProductsContext );
    
    const conectarSocket = useCallback( () => {

        const token = localStorage.getItem('token');

        const socketTemp = io.connect( serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'x-token': token
            }
        });

        setSocket( socketTemp );

    }, [ serverPath ]);

    const desconectarSocket = useCallback( () => {
        socket?.disconnect();
    }, [ socket ]);

    // Sockets Publicos

    const client = useMemo(() => io.connect( serverPath, {
        transports: ['websocket']
    }), [ serverPath ] );

    useEffect(() => {
        setClientSocket( client.connected );
    }, [ client.connected ])

    useEffect(() => {
        client.on('connect', () => setOnline( true ));
    }, [ client ])

    useEffect(() => {
        client.on('disconnect', () => setOnline( false ));
    }, [ client ])

    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    // List of cartShopping
    useEffect(() => {
        socket?.on('lista-carrito', ( product ) => {
            dispatch({
                type: types.AñadirCarrito,
                payload: product
            })
        });
    }, [ socket, dispatch ])

    // Most Stock product
    useEffect(() => {
        socket?.on('most-stock', (product) => {
            dispatch({
              type: types.MostStock,
              payload: product
            })
        });
    }, [ socket, dispatch ])

    // Most Stock product Public
    useEffect(() => {
        client?.on('most-stock', (product) => {
            dispatch({
              type: types.MostStock,
              payload: product
            })
        });
    }, [ client, dispatch ])

    // Featured products
    useEffect(() => {
        socket?.on('featured', (product) => {
            dispatch({
              type: types.Featured,
              payload: product
            })
        });
    }, [ socket, dispatch ])

    // Featured products Public
    useEffect(() => {
        client?.on('featured', (product) => {
            dispatch({
              type: types.Featured,
              payload: product
            })
        });
    }, [ client, dispatch ])

    // Featured products
    useEffect(() => {
        socket?.on('products', (product) => {
            dispatch({
              type: types.cargarProductos,
              payload: product
            })
        });
    }, [ socket, dispatch ])

    // Featured products Public
    useEffect(() => {
        client?.on('products', (product) => {
            dispatch({
              type: types.cargarProductos,
              payload: product
            })
        });
    }, [ client, dispatch ])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket,
        client,
        clientSocket
    }
}