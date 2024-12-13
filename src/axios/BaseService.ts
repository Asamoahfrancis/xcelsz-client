import axios from "axios";

// Determine baseURL based on Vite environment variables
const baseURL =
  import.meta.env.VITE_APP_ENV === "development"
    ? import.meta.env.VITE_API_LOCAL
    : import.meta.env.VITE_API_URL;

console.log("baseURL : ", baseURL);
const AuthaxiosInstance = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AuthaxiosInstance;
