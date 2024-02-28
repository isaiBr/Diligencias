import { axiosClientScrapper } from "./AxiosClient";

export const axiosGetScrapperOffShore = (nombre) =>{
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
      return axiosClientScrapper.get(`/offShore?nombreBusqueda=${nombre}`);
  }

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

  export const axiosGetScrapperOfac = (nombre) =>{
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
      return axiosClientScrapper.get(`/ofac?nombreBusqueda=${nombre}`);
  }