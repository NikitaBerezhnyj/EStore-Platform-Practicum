import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const createProduct = async productData => {
  try {
    const response = await axios.post(`${API_URL}/product`, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response ? error.response.data : error);
    throw error;
  }
};

export const getProduct = async productId => {
  try {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error.response ? error.response.data : error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/product/${productId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response ? error.response.data : error);
    throw error;
  }
};

export const deleteProduct = async productId => {
  try {
    const response = await axios.delete(`${API_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.response ? error.response.data : error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response ? error.response.data : error);
    throw error;
  }
};

export const searchProducts = async searchParams => {
  try {
    const response = await axios.get(`${API_URL}/products/search`, { params: searchParams });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error.response ? error.response.data : error);
    throw error;
  }
};
