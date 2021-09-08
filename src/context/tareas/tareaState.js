import React, { useReducer } from 'react';

import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {

    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    };

    // Dispatch para ejecutar acciones
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // Crear Funciones

    // Traer tareas del proyecto

    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: { proyecto }});
            // console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            }); 
        } catch (error) {
            console.log(error);
        }
    };

    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {

            const resultado = await clienteAxios.post('/api/tareas', tarea);
            // console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            });

        } catch (error) {
            console.log(error);
        }

    };

    // Valida y muestra un error 
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    };

    // Eliminar tarea por su id
    const eliminarTarea = async (id, proyecto) => {

        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: { proyecto }});    

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }

    };

    // Actualizar Tarea
    const actualizarTarea = async tarea => {
        // console.log(tarea);
        
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.existeTarea
            });

        } catch (error) {
            console.log(error);
        }
    };

    // Extrae una tarea para edición
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    };

    // Limpiar Tarea
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        });
    };


    return (
        <tareaContext.Provider
            value={{
                tareasProyecto : state.tareasProyecto,
                errorTarea : state.errorTarea,
                tareaSeleccionada : state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
};

export default TareaState;