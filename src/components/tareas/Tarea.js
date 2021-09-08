import React, { useContext } from 'react';

import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';


const Tarea = ({ tarea }) => {

    // Extraer si un proyecto está activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Extraer proyecto actual de array destructuring
    const [proyectoActual] = proyecto;

    // Traer la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } =  tareasContext;

    // Función que se ejectua cuando se da click en el boton
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    // Función que cambia el estado
    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }

        actualizarTarea(tarea);
    }

    // Función que edita la tarea
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado
                ?
                    (
                        <button 
                            type="button"
                            className="completo"
                            onClick={ () => cambiarEstado(tarea) }
                        >Completo</button>
                    )
                :
                    (
                        <button 
                            type="button"
                            className="incompleto"
                            onClick={ () => cambiarEstado(tarea) }
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={ () => seleccionarTarea(tarea) }
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => tareaEliminar(tarea._id) }
                >Eliminar</button>
            </div>
        </li>   
    );
}
 
export default Tarea;