import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    // Extraer valores del Context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciaSesion } = authContext;

    // En caso de que el password o usuario no exista
    useEffect(() => {
        
        if(autenticado){
             props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    // State para iniciar sesión
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    // Extraer el usuario
    const { email, password } = usuario;

    const iniciarSesion = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    };

    // Cuando el usuario quiere Iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

        // Validación que los campos no esten vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        // Mandar al Action
        iniciaSesion({email, password});
    }

    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input  
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={iniciarSesion}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Pasword</label>
                        <input  
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={iniciarSesion}
                        />
                    </div>

                    <div className="campo-form">
                      <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión" />
                    </div>     

                </form>     
                
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    ¿No tienes una cuenta? Registrate Aquí
                </Link>

            </div>
        </div>
    );
}
 
export default Login;