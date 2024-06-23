import axios from "axios";

const base_url = "http://localhost:3001/api/users";

// make a function, that requests the register api

export const registerUser = async (userData) => {
  const response = await axios.post(`${base_url}/register-user`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${base_url}/user-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};





export const getAllUsers = async () => {
  const response = await axios.get(`${base_url}/all-users`);
  return response.data;
};

export const myProfile = async (user_id) => {
  const response = await axios.get(`${base_url}/my-profile/${user_id}`);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};