
import { types } from './../types/types';

export const ProductReducer = ( state, action ) => {

    switch ( action.type ) {

        case types.cerrarSesion:
            return {
                uid: '',
                chatActivo: null,
                usuarios: [],
                mensajes: []
            }
        case types.usuariosCargados:
            return {
                ...state,
                usuarios: [ ...action.payload ]
            }
        case types.activarChat:

        if( state.chatActivo === action.paylaod ) return state;
        
            return {
                ...state,
                chatActivo: action.payload,
                mensajes: []
            }
        case types.nuevoMensaje:
            if ( state.chatActivo === action.payload.de || state.chatActivo === action.payload.para ) {
                return {
                    ...state,
                    mensajes: [ ...state.mensajes, action.payload ]
                }
            } else {
                return state;
            }
        case types.cargarMensajes:
            return {
                ...state,
                mensajes: [ ...action.payload ]
            }
        case types.MostStock:
            return{
                ...state,
                MostStock: [ ...action.payload ]
            }
        case types.Featured:
            return {
                ...state,
                Featured: [ ...action.payload ]
            }
        case types.cargarProductos:
            return {
                ...state,
                productos: [ ...action.payload ]
            }
        case types.AñadirCarrito:
            return {
                ...state,
                carrito: [ ...action.payload ]
            }
        case types.cargarCarritos:
            return {
                ...state,
                carrito: [ ...action.payload ]
            }
        case types.LogoutCarrito:
            return {
                ...state,
                carrito: []
            }
            
    
        default:
            return state
    }


}