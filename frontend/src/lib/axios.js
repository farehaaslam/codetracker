import axios from "axios";
const PROD_BACKEND_URL = "https://codetracker-api.onrender.com/api";
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : PROD_BACKEND_URL,
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      //console.log("genrating new access")
      try {
        const res = await axios.post(
          import.meta.env.MODE === "development"
            ? "http://localhost:5000/api/user/refresh"
            : "https://your-backend-service-name.onrender.com/api/user/refresh",
          {
            refreshToken,
          }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshErr) {}
    }

    return Promise.reject(error);
  }
);
