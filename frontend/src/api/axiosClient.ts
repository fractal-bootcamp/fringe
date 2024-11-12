import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3005",
});

export default axiosClient;
