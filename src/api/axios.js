import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5050/api",
});

export default api;
