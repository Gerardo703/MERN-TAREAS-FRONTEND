import React from 'react';
import ListadoProyectos from '../proyectos/ListadoProyectos';
import NuevoProyecto from '../proyectos/NuevoProyecto';

const Sidebar = () => {
    return ( 
        <aside>
            <h1>MERN <span>TAREAS</span></h1>

            <NuevoProyecto/>   

            <div className="proyectos">
                <h2>TUS PROYECTOS</h2>

                <ListadoProyectos />
            </div>
        </aside>
    );
}
 
export default Sidebar;