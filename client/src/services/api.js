import axios from "axios"; //makes requests to backend

// creating axios instance
const api = axios.create({
  baseURL: "https://extratime-football-jersey-store-backend.onrender.com/api",  //"http://localhost:5000/api",backend server address
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (checks for token in localStorage - modifies the request before the requesst is sent to backend)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); //checks for JWT token in local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  //adds 'Bearer' in request header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and autologout when session expires
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");  //removes token 
      localStorage.removeItem("user");  //remove user 
      window.location.href = "/login"; //redirects to login
    }
    return Promise.reject(error);
  }
);

export default api;
