import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserStoreHook } from "../store/modules/user";
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 60000,
  //参数序列化
  withCredentials: true,
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (responce: AxiosResponse) => {
    const { code, msg } = responce.data;
    //登录成功
    if (code === "00000") {
      return responce.data;
    }
    // 处理响应数据为二进制流的情况（Excel导出）
    if (responce.data instanceof ArrayBuffer) {
      return responce;
    }
    ElMessage.error(msg || "系统出错");
    return Promise.reject(new Error(msg || "Error"));
  },
  (error: any) => {
    if (error.responce.data) {
      const { code, msg } = error.responce.data;
      //token 过期，重新登录
      if (code === "A0230") {
        ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          const userStore = useUserStoreHook();
          userStore.resetToken().then(() => {
            location.reload();
          });
        });
      } else {
        ElMessage.error(msg || "系统出错");
      }
    }
    return Promise.reject(error.message);
  }
);

export default instance as request;
