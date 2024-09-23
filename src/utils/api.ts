import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const API: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  timeout: 50000,
  headers: {},
});

const requestHandler = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("access_token") || "";
  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const responseHandler = (response: AxiosResponse): AxiosResponse => response;

const errorHandler = (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    //TODO: We will handle different error codes here
  }

  return Promise.reject(error);
};

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => requestHandler(config),
  (error: AxiosError) => errorHandler(error),
);

API.interceptors.response.use(
  (response: AxiosResponse) => responseHandler(response),
  (error: AxiosError) => errorHandler(error),
);

export default API;
