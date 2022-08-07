import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import {interfaceError} from "@/utils/catchError";

const service = axios.create(); // Request interceptors

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
); // Response interceptors

service.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response.data;
  },
  (error: any) => {
    // 接口有响应，但是返回错误
    if (error.response) {
      // 有响应，首先获取状态码，根据状态码来判断什么时候需要收集异常
      let response = error.response;
      if (response.status >= 400) {
          interfaceError(response);
      }
    }
    // 接口没响应，请求一直挂起，多数是接口崩溃了
    else {
        interfaceError(null);
    }
    return Promise.reject(error);
  }
);

export default service;
