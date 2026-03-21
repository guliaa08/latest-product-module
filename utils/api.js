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
    // const token = await AsyncStorage.getItem("persist:productModule");
    // console.log("tokenn =>", token);
    // console.log(
    //   "apiKey =>",
    //   JSON.parse(JSON.parse(token).productAppAuth).authKey,
    // );
    // const authKey = parseNestedJSON(token);
    const authKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDE2MywibmFtZSI6Ik11a2VzaCAiLCJjb21wYW55SWQiOiIxYzQzYzhjMi1jNzg0LTQ0MmUtOTU3NC03YTM4ZTgyODJkMWEiLCJyZWdpb25zIjpbeyJpZCI6IjBjNDc4NTE2LWRhNzQtNGU1YS04OGVlLTQ0ZGU3ZTMzZWVjNyIsIm5hbWUiOiJIYXJ5YW5hIn0seyJpZCI6Ijc1NDQ4MTA5LWEzMjktNGVhMC05YmI2LWVmNDcwNDAzZDRjYyIsIm5hbWUiOiJQdW5qYWIifV0sImNsdXN0ZXJzIjpbXSwiZm9ybWF0cyI6W10sInN0b3JlcyI6W10sInJvbGVzIjpbeyJpZCI6NzY4LCJuYW1lIjoiUk9PVCJ9XSwic2Vzc2lvbklkIjo3NzMzLCJpYXQiOjE3NzQwNjU0MzYsImV4cCI6MTc3NDE1MTgzNn0.tc3kKadU_we7kFwYiBFkkrmK_xCFjey7NSPngJdm-4s";
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
