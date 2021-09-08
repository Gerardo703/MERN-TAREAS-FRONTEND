import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'; // Paquetes para animaciones en reacts


const ListadoTareas = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } =  tareasContext;

    // Si no hay proyectos que muestre que no hay proyectos
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    // Array destructuring para extraer el proyecto actual del array
    const [ proyectoActual ] = proyecto;



    const onclickEliminarProyecto = () => {
        eliminarProyecto(proyectoActual._id);
    }

    return ( 
        <Fragment>
            <h1>PROYECTO</h1><h2>{ proyectoActual.nombre }</h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0

                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : 
                    <TransitionGroup>
                        {tareasProyecto.map( tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={500}
                                classNames="tarea"
                            >
                                <Tarea 
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button
                onClick={ onclickEliminarProyecto }
                type="button"
                className="btn btn-eliminar"
            >Eliminar Proyecto &times;</button>

        </Fragment>
    );
}
 
    export default ListadoTareas;