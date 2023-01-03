import axios from "axios";

const ENDPOINT_USERS = "http://localhost:3000/api/usuarios";
const ENDPOINT_PRODUCTS = "localhost:3000/api/productos";


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
    return axios.post(`${ENDPOINT_USERS}/`, user);
}

export const renovateToken = (nombre, correo, password) => {
    const token = {
        nombre,
        correo,
        password
    };
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