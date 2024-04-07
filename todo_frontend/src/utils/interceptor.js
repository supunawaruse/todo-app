import axios from "axios";

const API_BASE_URL = "https://your-api-base-url";
const REFRESH_TOKEN_ENDPOINT = '/auth/refresh';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
});

let isRefreshing = false;
let failedRequestsQueue = [];

apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        const response = await axios.post(REFRESH_TOKEN_ENDPOINT, {
          refreshToken,
        });

        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
        }

        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return API_CLIENT(originalRequest);
      } catch (error) {
      } finally {
        isRefreshing = false;
        const failedRequests = failedRequestsQueue;
        failedRequestsQueue = [];
        failedRequests.forEach((request) => API_CLIENT(request));
      }
    } else {
      return Promise.reject(error);
    }
  }
);
