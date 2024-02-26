import axios from "axios"

const axiosClient = axios.create({
  baseURL:"https://localhost:7086/api/Proveedor",
  responseType:"json",
  headers:{
    "Accept":"application/json",
    "Content-type":"application/json"
  }
})

export {axiosClient}