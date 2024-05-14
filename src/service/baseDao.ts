import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 60000,
  //参数序列化
  withCredentials: true,
});

// 请求拦截器
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {});
