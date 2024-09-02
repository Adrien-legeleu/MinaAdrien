import axios from "axios";

const isDev = true;
const devUrl = "http://localhost:5050";

export const api = axios.create({
  baseURL: isDev ? devUrl : "prodUrl",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
