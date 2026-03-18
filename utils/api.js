// import axios from "axios";
// import { store } from "../redux/store";

// const BASE_URL = "https://omnichannel-apiv1.airaops.com/";

// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   async (config) => {
//     const state = store.getState();
//     const authKey = state.productAppAuth?.authKey;

//     if (authKey) {
//       config.headers.Authorization = `Bearer ${authKey}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     const response = error.response;

//     const message =
//       response?.data?.message ||
//       response?.data?.error ||
//       "Something went wrong";

//     return Promise.reject({
//       status: response?.status,
//       message,
//     });
//   },
// );

// export default api;

import axios from "axios";
import { store } from "../redux/store";
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
    console.log("tokenn =>", token);
    const authKey = parseNestedJSON(token);
    console.log("authKeyyyy =>", authKey);
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
