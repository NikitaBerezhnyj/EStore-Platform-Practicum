import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = async userData => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response ? error.response.data : error);
    throw error;
  }
};

export const loginUser = async credentials => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error.response ? error.response.data : error);
    throw error;
  }
};

export const forgotPassword = async email => {
  try {
    const response = await axios.post(`${API_URL}/auth/password-reset`, { email });
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error.response ? error.response.data : error);
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/auth/password-change/${token}`, {
      password: newPassword
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error.response ? error.response.data : error);
    throw error;
  }
};

export const getUserInfo = async userId => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error.response ? error.response.data : error);
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error.response ? error.response.data : error);
    throw error;
  }
};

export const deleteUser = async userId => {
  try {
    const response = await axios.delete(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error.response ? error.response.data : error);
    throw error;
  }
};
