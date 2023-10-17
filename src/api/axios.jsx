import axios from "axios";
export default axios.create({
  baseURL: import.meta.env.REACT_APP_API,
});
export const axiosPrivate = axios.create({
  baseURL: import.meta.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
