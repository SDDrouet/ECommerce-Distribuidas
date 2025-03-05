import axios from 'axios';

const ordersApiUrl = import.meta.env.VITE_API_GATEWAY_URL;

export const getAllOrders = async () => {
  const response = await axios.get(`${ordersApiUrl}/orders`);
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axios.get(`${ordersApiUrl}/orders/${id}`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axios.post(`${ordersApiUrl}/orders`, orderData);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await axios.delete(`${ordersApiUrl}/orders/${id}`);
  return response.data;
};
