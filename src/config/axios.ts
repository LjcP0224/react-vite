import axios from "axios";
import { Toast } from "@douyinfe/semi-ui-19";
import { getToken, clearToken } from "@/utils/auth";

// 配置处理
const DEFAULT_ERROR_MESSAGE = "请求失败，请稍后重试";
const AUTH_HEADER_PREFIX = "Bearer ";
const TOKEN_REFRESH_CODES = [401]; // 需要刷新token的状态码

// 定义业务错误类型
class BusinessError extends Error {
  code: number;
  data?: unknown;
  constructor(message: string, code: number, data?: unknown) {
    super(message);
    this.name = "BusinessError";
    this.code = code;
    this.data = data;
  }
}

// Token过期处理 清除本地token并跳转登录页
function handleTokenExpired() {
  clearToken();
  window.location.pathname = "/login";
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config) => {
    const token: string | null = getToken();
    if (token) {
      config.headers["Authorization"] = `${AUTH_HEADER_PREFIX}${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    const { data } = response;
    // 处理业务逻辑错误
    if (data.code !== 200) {
      const errorMessage = data.message || DEFAULT_ERROR_MESSAGE;
      // 需要刷新token的特殊处理
      if (TOKEN_REFRESH_CODES.includes(data.code)) {
        handleTokenExpired();
      }
      Toast.error(errorMessage);
      return Promise.reject(
        new BusinessError(errorMessage, data.code, data.result),
      );
    }

    // 直接返回业务数据，减少业务层处理
    return response;
  },
  (error) => {
    let errorMessage = DEFAULT_ERROR_MESSAGE;
    // 处理不同错误类型
    if (error.response) {
      // 服务器响应错误
      const status = error.response.status;
      const serverError = error.response.data;
      errorMessage = serverError.message || `服务器错误 [${status}]`;
      if (TOKEN_REFRESH_CODES.includes(status)) {
        handleTokenExpired();
      }
    } else if (error.request) {
      // 请求未收到响应
      errorMessage = "网络连接异常，请检查网络设置";
    } else {
      // 请求配置错误
      errorMessage = `请求配置错误: ${error.message}`;
    }
    // 统一错误提示
    Toast.error({
      content: errorMessage,
      duration: 3,
    });

    return Promise.reject(error);
  },
);
