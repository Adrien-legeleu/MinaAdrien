import axios from "axios";

const isDev = true;
const devUrl = "http://localhost:3001";

export const api = axios.create({
  baseURL: isDev ? devUrl : "prodUrl",
});
