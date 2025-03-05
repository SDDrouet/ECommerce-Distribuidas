import axios from 'axios';

const inventoryApiUrl = import.meta.env.VITE_API_GATEWAY_URL;

export const getAllProducts = async () => {
  const response = await axios.get(`${inventoryApiUrl}/products`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${inventoryApiUrl}/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(`${inventoryApiUrl}/products`, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${inventoryApiUrl}/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${inventoryApiUrl}/products/${id}`);
  return response.data;
};

export const updateProductStock = async (id, quantity) => {
  const response = await axios.put(`${inventoryApiUrl}/products/${id}/stock?quantity=${quantity}`);
  return response.data;
};

export const checkProductStock = async (id, quantity) => {
  const response = await axios.get(`${inventoryApiUrl}/products/${id}/stock/${quantity}`);
  return response.data;
};
