import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5051/api",
});

export default api;
