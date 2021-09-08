import clienteAxios from './axios';

const tokenAuth = token => {

    if(token) {
        clienteAxios.defaults.headers.common['x-auth-token'] = token; // Si hay un toquen lo agregamos en el header
    } else {
        delete clienteAxios.defaults.headers.common['x-auth-token']; // Si ya no hay lo eliminamos
    };   
};

export default tokenAuth;