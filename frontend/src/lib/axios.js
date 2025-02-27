import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:4000/api"
      : "/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 413) {
      toast.error("Request is too large")
    }
    console.log(error.response.status)
    throw error;
  }
)

export default axiosInstance