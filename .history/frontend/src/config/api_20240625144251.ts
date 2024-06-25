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

    if (userToken) {
      config.headers["User-Authorization"] = `Bearer ${userToken}`;
    }

    if (groupToken) {
      config.headers["Group-Authorization"] = `Bearer ${groupToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
