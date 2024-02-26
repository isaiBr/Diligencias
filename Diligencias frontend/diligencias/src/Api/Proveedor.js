import { axiosClient } from "./AxiosClient";

export const axiosGetProveedores = () =>{
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
    return axiosClient.get(`/listar`);
}

export const axiosGetProveedorPorId = (id) =>{
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
    return axiosClient.get(`/ver?id=${id}`);
}

export const axiosPostProveedor = (body) =>{
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
    return axiosClient.post(`/crear`,body);
}

export const axiosUpdateProveedor = (id, body) =>{
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
    return axiosClient.put(`/editar?id=${id}`, body);
}

export const axiosDeleteProveedor = (id) =>{
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
    return axiosClient.delete(`/eliminar?id=${id}`);
    
}