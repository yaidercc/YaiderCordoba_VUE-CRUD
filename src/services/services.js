import axios from "axios";

const ENDPOINT_USERS = "http://localhost:3500/api/usuarios";
const ENDPOINT_PRODUCTS = "http://localhost:3500/api/productos";


// Usuarios

export const loginUser = (correo, password) => {
    const user = {
        correo,
        password
    };
    return axios.post(`${ENDPOINT_USERS}/login`, user);
}
export const createUser = (nombre, correo, password) => {
    const user = {
        nombre,
        correo,
        password
    };
    return axios.post(`${ENDPOINT_USERS}/createUser`, user);
}

export const renovateToken = () => {
    return axios.get(`${ENDPOINT_USERS}/renew`, {
        headers: {
            'x-api-key': `${localStorage.getItem("token")}`
        }
    })
}

export const deleteToken = () => {
    localStorage.removeItem("token");
}

// Productos

export const getProductsByUser = (id) => {
    return axios.get(`${ENDPOINT_PRODUCTS}/getProducts/${id}`)
}

export const createProduct = (nombre,precio,imagen,propietario) => {
    const body = {
        nombre,precio,imagen,propietario
    };
    return axios.post(`${ENDPOINT_PRODUCTS}/createProduct`,body)
}

export const updateProduct = (nombre,precio,imagen,id_producto) => {
    const body = {
        nombre,precio,imagen
    };
    return axios.put(`${ENDPOINT_PRODUCTS}/updateProduct/${id_producto}`,body)
}
export const updateCalificacion = (calificacion,id_producto) => {
    const body = {
        calificacion
    };
    return axios.put(`${ENDPOINT_PRODUCTS}/updateCalificacion/${id_producto}`,body)
}
export const deleteProduct = (id_producto) => {
    return axios.delete(`${ENDPOINT_PRODUCTS}/deleteProduct/${id_producto}`)
}