import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // Extraer si un proyecto está activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Traer la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaSeleccionada, errorTarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } =  tareasContext;

    // UseEffect detecta si hay una tarea seleccionada
    useEffect( () => {
        
        if(tareaSeleccionada !== null){
            setTarea(tareaSeleccionada);
        }else{
            setTarea({
                nombre: ''
            })
        }

    }, [tareaSeleccionada])

    // State del formulario
    const [ tarea, setTarea ] = useState({
        nombre: ''
    });

    const { nombre } = tarea

    // Si no hay proyectos que muestre que no hay proyectos
    if(!proyecto) return null;
    
    // Array destructuring para extraer el proyecto actual del array
    const [ proyectoActual ] = proyecto;

    // Leer los valores del formularo
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        });
    };

    const onsubmit = e => {
        e.preventDefault();

        // Validar que no esté vacio
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        // Revisar si es edición o agregar tarea
        if( tareaSeleccionada === null) {
            // Es una tarea nueva
            // Agregar nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);

        }else {
            // Actualizar tarea existente
            actualizarTarea(tarea);

            //Limpiar tareaSeleccionada del State
            limpiarTarea();
        };

        // Obtener y filtrar las tareas
        obtenerTareas(proyectoActual.id);

        // Reset form
        setTarea({
            nombre: '',
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onsubmit}
            >
                <div className="contenedor-input" >
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input" >
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value={ tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>

            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}
 
export default FormTarea;