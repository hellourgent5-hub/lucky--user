import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://lucky-backend-rlr0.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signupUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);
export const getProducts = (category) => API.get(`/products?category=${category}`);
export const getCategories = () => API.get("/services");
export const createOrder = (data) => API.post("/orders", data);

export default API;
