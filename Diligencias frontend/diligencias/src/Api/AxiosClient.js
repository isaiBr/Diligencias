import axios from "axios"

const axiosClient = axios.create({
  baseURL:"https://localhost:7086/api/Proveedor",
  responseType:"json",
  headers:{
    "Accept":"application/json",
    "Content-type":"application/json"
  }
})

const axiosClientScrapper = axios.create({
  baseURL:"https://localhost:7004/api/WebScrapper",
  responseType:"json",
  headers:{
    "Accept":"application/json",
    "Content-type":"application/json"
  }
})

export {axiosClient,axiosClientScrapper}