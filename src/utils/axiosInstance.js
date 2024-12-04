import axios from "axios";
import { useContext, useMemo } from "react";
import { UserContext } from "../contexts/UserContext";

const useAxios = () => {
  const { token } = useContext(UserContext);

  const instance = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

    const cleanToken = token?.replace(/^"|"$/g, '');

    axiosInstance.interceptors.request.use(
      (config) => {
        if (cleanToken) {
          config.headers.authorization = `Bearer ${cleanToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return axiosInstance;
  }, [token]);

  return instance;
};

export default useAxios;