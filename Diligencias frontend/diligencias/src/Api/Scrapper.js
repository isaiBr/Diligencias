import { axiosClientScrapper } from "./AxiosClient";

export const axiosGetScrapperWorldBank = (nombre) =>{
    axiosClientScrapper.interceptors.request.use(
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
      return axiosClientScrapper.get(`/worldBank?nombreBusqueda=${nombre}`);
  }