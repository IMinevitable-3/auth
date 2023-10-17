import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { useAuth } from "./useAuth";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  console.log(auth.access);

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.access}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (resp) => resp,
      async (error) => {
        const reqConfig = error?.config;
        if (error?.response?.status === 401 && !reqConfig?._retry) {
          reqConfig._retry = true; // not to resend
          try {
            const newAccessToken = await refresh();
            reqConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(reqConfig); // making the request again
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};
