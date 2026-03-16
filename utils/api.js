import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// if (__DEV__) {
//   // BASE_URL = 'http://192.168.29.213:8000';
//   // BASE_URL = 'http://10.0.29.213:8080';
//   BASE_URL = 'https://omnichannel-apiv1.airaops.com/';
// } else {
//   // Production config
//   BASE_URL = 'https://omnichannel-apiv1.airaops.com/';
// }
const BASE_URL = 'https://omnichannel-apiv1.airaops.com/';

// Safely extract authKey
const getAuthKey = async () => {
  try {
    // const token = await AsyncStorage.getItem('persist:root');
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDE2MywibmFtZSI6Ik11a2VzaCAiLCJjb21wYW55SWQiOiIxYzQzYzhjMi1jNzg0LTQ0MmUtOTU3NC03YTM4ZTgyODJkMWEiLCJyZWdpb25zIjpbeyJpZCI6IjBjNDc4NTE2LWRhNzQtNGU1YS04OGVlLTQ0ZGU3ZTMzZWVjNyIsIm5hbWUiOiJIYXJ5YW5hIn0seyJpZCI6Ijc1NDQ4MTA5LWEzMjktNGVhMC05YmI2LWVmNDcwNDAzZDRjYyIsIm5hbWUiOiJQdW5qYWIifV0sImNsdXN0ZXJzIjpbXSwiZm9ybWF0cyI6W10sInN0b3JlcyI6W10sInJvbGVzIjpbeyJpZCI6NzY4LCJuYW1lIjoiUk9PVCJ9XSwic2Vzc2lvbklkIjo3NzU5LCJpYXQiOjE3NzM1ODMyMTksImV4cCI6MTc3MzY2OTYxOX0.zyqmFavXr1j2UTTCFxmda-W1G8-p1VEsMc-N_ygBe1Q"
    if (!token) return null;
    return token;
    const parsedRoot = JSON.parse(token);
    console.log('parsedRoot', parsedRoot);
    if (!parsedRoot?.auth) return null;

    const parsedAuth = JSON.parse(parsedRoot.auth);
    return parsedAuth?.authKey || null;
  } catch (e) {
    console.warn('Failed to parse auth token');
    return null;
  }
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/* ---------------- REQUEST INTERCEPTOR ---------------- */
api.interceptors.request.use(
  async config => {
    const authKey = await getAuthKey();

    console.log('authKey', authKey);

    // Attach token ONLY if it exists
    if (authKey) {
      config.headers.Authorization = `Bearer ${authKey}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

/* ---------------- RESPONSE INTERCEPTOR ---------------- */
api.interceptors.response.use(
  response => {
    // 🔥 IMPORTANT: return only data
    return response.data;
  },
  error => {
    const response = error.response;

    if (response?.status === 401) {
      console.log('Unauthorized – session expired');
    }

    const message =
      response?.data?.message ||
      response?.data?.error ||
      'Something went wrong';

    return Promise.reject({
      status: response?.status,
      message,
    });
  },
);

export default api;
