import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const parseNestedJSON = (str) =>
  JSON.parse(JSON.parse(str).productAppAuth).authKey;
const instance = axios.create({
  baseURL: "https://omnichannel-apiv1.airaops.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("persist:productModule");
    const authKey = parseNestedJSON(token);
    if (authKey) {
      config.headers.Authorization = `Bearer ${authKey}`;
    } else {
      console.warn("authKey was not provided for", config.url);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
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

export default instance;
