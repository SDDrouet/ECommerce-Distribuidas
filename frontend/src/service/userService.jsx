import axios from 'axios';

const usersApiUrl = import.meta.env.VITE_API_GATEWAY_URL;

// 📌 Registrar un usuario
export const registerUser = async (userData) => {
  const response = await axios.post(`${usersApiUrl}/users/register`, userData);
  return response.data;
};

// 📌 Iniciar sesión (Ahora con body en lugar de query params)
export const loginUser = async (username, password) => {
  const response = await axios.post(`${usersApiUrl}/users/login`, { username, password });
  return response.data;
};

// 📌 Obtener todos los usuarios
export const getAllUsers = async () => {
  const response = await axios.get(`${usersApiUrl}/users`);
  return response.data;
};

// 📌 Obtener un usuario por ID
export const getUserById = async (id) => {
  const response = await axios.get(`${usersApiUrl}/users/${id}`);
  return response.data;
};

// 📌 Actualizar un usuario
export const updateUser = async (id, userData) => {
  const response = await axios.put(`${usersApiUrl}/users/${id}`, userData);
  return response.data;
};

// 📌 Eliminar un usuario
export const deleteUser = async (id) => {
  const response = await axios.delete(`${usersApiUrl}/users/${id}`);
  return response.data;
};

// 📌 Cambiar rol del usuario rápidamente
export const changeUserRole = async (id, newRole) => {
  const response = await axios.patch(`${usersApiUrl}/users/${id}/role`, { role: newRole });
  return response.data;
};
