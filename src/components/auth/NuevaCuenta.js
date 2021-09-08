import React, { useState, useContext,useEffect } from 'react';
// import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    // Extraer valores del Context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registarUsuario } = authContext;

    // En caso que el usuario se haya registrado, autenticado o duplicado
    useEffect(() => {
        
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    // State para iniciar sesión
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    // Extraer el usuario
    const { nombre, email, password, confirmar } = usuario;

    const onchangeState = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    };

    // Cuando el usuario quiere Iniciar sesión
    const crearCuenta = e => {

        e.preventDefault();

        // Validación que los campos no esten vacios
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '' ){

            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        };

        // Password minimo 6 caracteres
        if(password.length < 8) {
            mostrarAlerta('El password debe ser de al menos 8 caracteres', 'alerta-error');
            return;
        }

        // Los dos password sean iguales
        if(password !== confirmar){
            mostrarAlerta('Los passwords no coinciden', 'alerta-error');
            return;
        }

        // Mandar al Action
        registarUsuario({
            nombre,
            email,
            password
        });

    }

    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>

                <form
                    onSubmit={crearCuenta}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input  
                            type="text"
                            name="nombre"
                            id="nombre"
                            placeholder="nombre"
                            value={nombre}
                            onChange={onchangeState}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input  
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={onchangeState}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input  
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={onchangeState}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input  
                            type="password"
                            name="confirmar"
                            id="confirmar"
                            placeholder="Password"
                            value={confirmar}
                            onChange={onchangeState}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme" />
                    </div>   
                </form>

                                     

            </div>
        </div>
    );
}
 
export default NuevaCuenta;