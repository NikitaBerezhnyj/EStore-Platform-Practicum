import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const createOrder = async orderData => {
  try {
    const response = await axios.post(`${API_URL}/order`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response ? error.response.data : error);
    throw error;
  }
};

export const getOrder = async orderId => {
  try {
    const response = await axios.get(`${API_URL}/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error.response ? error.response.data : error);
    throw error;
  }
};

export const updateOrder = async (orderId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/order/${orderId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error.response ? error.response.data : error);
    throw error;
  }
};

export const deleteOrder = async orderId => {
  try {
    const response = await axios.delete(`${API_URL}/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error.response ? error.response.data : error);
    throw error;
  }
};
