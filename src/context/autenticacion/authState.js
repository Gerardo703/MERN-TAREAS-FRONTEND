import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

// import Swal from 'sweetalert2';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types'

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'), // Guardar el token el localstorage
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    };

    const [ state, dispatch ] = useReducer( AuthReducer, initialState );

    // Funciones

    const registarUsuario = async datos => {

        try {

            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            // console.log(respuesta.data);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            // Obtenemos el usuario
            usuarioAutenticado();

        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        };
    };

    // Retorna la información del usuario
    const usuarioAutenticado = async () => {

        const token = localStorage.getItem('token');
        // console.log(token);
        
        if(token){
           tokenAuth(token);   
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            // console.log(respuesta.data.usuario);

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Cuando el usuario inicia sesión

    const iniciaSesion = async datos => {

        try {
            const respuesta = await clienteAxios.post('api/auth', datos);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            // Obtenemos el usuario
            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    // Cierra la sesión
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });

    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registarUsuario,
                iniciaSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;