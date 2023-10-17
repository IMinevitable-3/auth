import axios from "../api/axios";
import { useAuth } from "./useAuth";
const URL = "api/token/refresh/";
export const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { auth } = useAuth();

  const RefreshToken = async () => {
    try {
      const resp = await axios.post(
        URL,
        { refresh: auth?.refresh },
        {
          withCredentials: true,
        }
      );

      setAuth((prev) => {
        console.log("old " + JSON.stringify(prev));
        console.log("new " + resp?.data?.access);
        return { ...prev, access: resp?.data?.access };
      });

      return resp?.data?.access;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  };

  return RefreshToken;
};
