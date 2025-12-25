import axios from "axios";
import { message as Message } from "antd";
import storage from "./storage";
import { useStore } from "../store";
const url = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: url,
  timeout: 5000,
  timeoutErrorMessage: "请求超时，请稍后重试",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    X_Requested_With: "XMLHttpRequest",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 动态注入最新的 token（避免创建实例时 token 为空或过期后未更新）
    if (config && config.headers) {
      // @ts-ignore
      config.headers.Authorization = `Bearer ${storage.getItem("token") || ""}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { data, code, message } = res;
    // 200 表示成功，直接返回 data
    if (code === 200) {
      return data;
    }

    // 鉴权相关：401/403 表示未授权或无权限，406 可视为会话失效
    if (code === 401 || code === 403 || code === 406) {
      Message.error(message || "未授权，请重新登录");
      // 清除本地存储的 token，并跳转登录页
      storage.clearAll();
      setTimeout(() => {
        // 使用 location 跳转，避免在拦截器中依赖 react-router 的 navigate
        window.location.href = "/login";
      }, 1500);
      return Promise.reject(res);
    }

    // 其他错误展示消息并返回 rejected promise
    Message.error(message || "请求出错");
    return Promise.reject(res);
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 使用泛型使调用方能获得拦截器处理后的 data 类型
export default {
  get: <T = any>(url: string, params?: any): Promise<T> =>
    instance.get(url, { params }) as unknown as Promise<T>,
  post: <T = any>(url: string, params?: any): Promise<T> =>
    instance.post(url, params) as unknown as Promise<T>,
  put: <T = any>(url: string, params?: any): Promise<T> =>
    instance.put(url, params) as unknown as Promise<T>,
  delete: <T = any>(url: string, data?: any): Promise<T> =>
    instance.delete(url, { data }) as unknown as Promise<T>,
};
