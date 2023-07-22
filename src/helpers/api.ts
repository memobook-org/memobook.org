import axios from "axios";
import { useAuthStore } from "../stores/auth.store";
// return auth header with jwt if user is logged in and request is to the api url
const { user } = useAuthStore();
const isLoggedIn = !!user?.token;
if (isLoggedIn) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
}

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});
