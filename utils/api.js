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
    // const token = await AsyncStorage.getItem("persist:productModule");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDE3MywibmFtZSI6IkFqYXkgVXB0YSIsImNvbXBhbnlJZCI6IjFjNDNjOGMyLWM3ODQtNDQyZS05NTc0LTdhMzhlODI4MmQxYSIsInJlZ2lvbnMiOltdLCJjbHVzdGVycyI6W10sImZvcm1hdHMiOltdLCJzdG9yZXMiOlt7ImlkIjoiMTAyZGJhZDMtZTQ2ZC00MzA4LTgxODQtOTM5YmVlZjcxYjdjIiwibmFtZSI6IlBOMDEifV0sInJvbGVzIjpbeyJpZCI6NzY3LCJuYW1lIjoiU1RPUkVNQU5BR0VSIn1dLCJzZXNzaW9uSWQiOjc5NzQsImlhdCI6MTc3NDM0MTg1MiwiZXhwIjoxNzc0NDI4MjUyfQ.sfPF5MkHA2dNDm0Kl3hjjP-RsLbNG0jzPozLlvT6vYs"
    const authKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDE3MywibmFtZSI6IkFqYXkgVXB0YSIsImNvbXBhbnlJZCI6IjFjNDNjOGMyLWM3ODQtNDQyZS05NTc0LTdhMzhlODI4MmQxYSIsInJlZ2lvbnMiOltdLCJjbHVzdGVycyI6W10sImZvcm1hdHMiOltdLCJzdG9yZXMiOlt7ImlkIjoiMTAyZGJhZDMtZTQ2ZC00MzA4LTgxODQtOTM5YmVlZjcxYjdjIiwibmFtZSI6IlBOMDEifV0sInJvbGVzIjpbeyJpZCI6NzY3LCJuYW1lIjoiU1RPUkVNQU5BR0VSIn1dLCJzZXNzaW9uSWQiOjc5NzQsImlhdCI6MTc3NDM0MTg1MiwiZXhwIjoxNzc0NDI4MjUyfQ.sfPF5MkHA2dNDm0Kl3hjjP-RsLbNG0jzPozLlvT6vYs"

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
