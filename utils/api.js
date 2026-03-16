import axios from "axios";
import { store } from "../redux/store";

const BASE_URL = "https://omnichannel-apiv1.airaops.com/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const authKey = state.productAppAuth?.authKey;

    if (authKey) {
      config.headers.Authorization = `Bearer ${authKey}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const response = error.response;

    const message =
      response?.data?.message ||
      response?.data?.error ||
      "Something went wrong";

    return Promise.reject({
      status: response?.status,
      message,
    });
  },
);

export default api;
