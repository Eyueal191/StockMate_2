import axios from "axios";

const Axios = axios.create({
  baseURL: "https://stockmate-2-inventory-service.onrender.com",
  timeout: 60000,
  withCredentials: true, // Send cookies automatically
});
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const response = error.response;
    if (!response) return Promise.reject(error); // Network errors

    const { status, data } = response;

    const isAuthError =
      (status === 401 && (data.message === "No token provided" || data.message === "Access token has expired")) ||
      (status === 403 && data.message === "Invalid or expired token") ||
      (status === 404 && data.message === "User not found");
    if (isAuthError) {
      localStorage.removeItem("IsLoggedIn"); // Remove login flag
      window.location.href = "/login";       // Redirect to login page
    }

    return Promise.reject(error);
  }
);

export default Axios;
