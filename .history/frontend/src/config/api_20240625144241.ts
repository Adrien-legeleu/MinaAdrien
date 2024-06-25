import axios from "axios";

const isDev = true;
const devUrl = "http://localhost:5000";

export const api = axios.create({
  baseURL: isDev ? devUrl : "prodUrl",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("authToken");
    const groupToken = localStorage.getItem("authToken-group");

    if (authToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
