import axios from "axios";

// Endpoinst api
// const ENDPOINT_USERS = "https://yaidercordobanode-crud-production.up.railway.app/api/usuarios";
// const ENDPOINT_PRODUCTS = "https://yaidercordobanode-crud-production.up.railway.app/api/productos";

const ENDPOINT_USERS = "http://localhost:3500/api/usuarios";
// Usuarios

/**
 * Funcion encagarda de autenticar un usuario
 * @param {*} correo
 * @param {*} password
 * @returns
 */
export const loginUser = (correo, password) => {
  const user = {
    correo,
    password,
  };
  return axios.post(`${ENDPOINT_USERS}/login`, user);
};

/**
 * Funcion para crear un usuario
 * @param {*} nombre
 * @param {*} correo
 * @param {*} password
 * @returns
 */
export const createUser = (nombre, correo, password) => {
  const user = {
    nombre,
    correo,
    password,
  };
  return axios.post(`${ENDPOINT_USERS}/createUser`, user);
};

/**
 * Funcion encargada de enviar el email a los usuarios
 * @param {*} correo
 * @returns
 */
export const sendEmailUser = (correo) => {
  const data = {
    correo,
  };
  return axios.post(`${ENDPOINT_USERS}/sendEmailToUpdatePass`, data);
};
/**
 * Funcion encargada de validar la informacion que viene en el token
 * @param {*} token
 * @returns
 */
export const validarInfoToken = (token) => {
  const data = {
    "x-api-key": token,
  };
  return axios.get(`${ENDPOINT_USERS}/validateToken`, {
    headers: data,
  });
};

/**
 * Funcion encargada de enviar la nueva contraseña
 * @param {*} token
 * @param {*} id_user
 * @returns
 */
export const resetPassword = (clave, id_user) => {
  const data = {
    clave,
  };
  return axios.post(`${ENDPOINT_USERS}/resetPassword/${id_user}`, data);
};

/**
 * Funcion para renovar el token
 * @returns
 */
export const renovateToken = () => {
  return axios.get(`${ENDPOINT_USERS}/renew`, {
    headers: {
      "x-api-key": `${localStorage.getItem("token")}`,
    },
  });
};

/**
 * Funcion para cerrar sesion
 */
export const deleteToken = () => {
  localStorage.removeItem("token");
};

// Productos
/**
 * Funcion encargada de obtener todos los productos de un usuario
 * @param {*} id
 * @returns
 */
export const getProductsByUser = (id) => {
  return axios.get(`${ENDPOINT_PRODUCTS}/getProducts/${id}`);
};

/**
 * Funcion encargada de crear un producto
 * @param {*} nombre
 * @param {*} precio
 * @param {*} imagen
 * @param {*} propietario
 * @returns
 */
export const createProduct = (nombre, precio, imagen, propietario) => {
  const body = {
    nombre,
    precio,
    imagen,
    propietario,
  };
  return axios.post(`${ENDPOINT_PRODUCTS}/createProduct`, body);
};

/**
 * Funcion encargadad de actualizar la info de un producto
 * @param {*} nombre
 * @param {*} precio
 * @param {*} imagen
 * @param {*} id_producto
 * @returns
 */
export const updateProduct = (nombre, precio, imagen, id_producto) => {
  const body = {
    nombre,
    precio,
    imagen,
  };
  return axios.put(`${ENDPOINT_PRODUCTS}/updateProduct/${id_producto}`, body);
};

/**
 * Funcion encargada de actualizar la calificacion de un producto
 * @param {*} calificacion
 * @param {*} id_producto
 * @returns
 */
export const updateCalificacion = (calificacion, id_producto) => {
  const body = {
    calificacion,
  };
  return axios.put(
    `${ENDPOINT_PRODUCTS}/updateCalificacion/${id_producto}`,
    body
  );
};
/**
 * Funcion encargar de eliminar un producto
 * @param {*} id_producto
 * @returns
 */
export const deleteProduct = (id_producto) => {
  return axios.delete(`${ENDPOINT_PRODUCTS}/deleteProduct/${id_producto}`);
};
