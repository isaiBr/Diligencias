import { axiosClient } from "./AxiosClient";

export const axiosGetUser = (correo, password) =>{
    axiosClient.interceptors.request.use(
      async config => {
        config.headers = {
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
        return config
      },
      error=>{
          Promise.reject(error)
      });
      return axiosClient.get(`/ver?correo=${correo}&password=${password}`);
  }