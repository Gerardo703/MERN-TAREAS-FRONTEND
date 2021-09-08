import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    // State para proyectos
    const [ proyecto, setProyecto ] = useState({
        nombre: ''
    });

    // Leer los datos del formulario 
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    // Enviar un nuevo proyecto
    const onSubmitProyecto = e => {

        e.preventDefault();

        // Validar Proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }

        // Agregar al State
        console.log(proyecto);
        agregarProyecto(proyecto);
        

        // Reset form
        setProyecto({
            nombre: ''
        });
        
    }

    // Extraer nombre del Proyecto
    const { nombre } = proyecto;

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
                
            >
            Nuevo Proyecto    
            </button>

            { formulario ?
                (
                    <form 
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre Proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />

                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"  
                            
                        />
                    </form>

                ) :  null }

                {/* Mostrar el error si el campo está vacío */}

                { errorformulario ? <p className="mensaje error">El campo nombre es obligatorio</p> : null }    

        </Fragment>
    );
}
 
export default NuevoProyecto;