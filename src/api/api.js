import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://lucky-backend-rlr0.onrender.com/api",
  headers: { "Content-Type": "application/json" }
});

// attach token when present (userToken)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// User endpoints
export const userRegister = (data) => API.post("/users/register", data);
export const userLogin = (data) => API.post("/users/login", data);

// Data endpoints
export const getServices = () => API.get("/services");
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const createOrder = (data) => API.post("/orders", data);
export const getUserOrders = () => API.get("/orders"); // expects auth

export default API;
