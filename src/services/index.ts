import axios from "axios";
import { SERVER_URL } from "../utils/config";

// export const publicRequest = axios.create({
//   baseURL: SERVER_URL
// });

const api = axios.create({ baseURL: SERVER_URL });

api.defaults.headers.common["Content-Type"] = "application/json";

export const defaultHeaders = {};

// const excludeRoutes = ["auth/login", "auth/register", "camp"];

// api.interceptors.request.use(request => {
//   console.log("request", request.url);
//   if (excludeRoutes.includes(request.url)) {
//     defaultHeaders.token = {};
//   } else {
//     const user = localStorage.getItem("currentUser");
//     const accessToken = JSON.parse(user).accessToken;
//     console.log("accessToken", accessToken);
//     request.headers.token = accessToken && `Bearer ${accessToken}`;
//     defaultHeaders.token = accessToken && `Bearer ${accessToken}`;
//   }
//   return request;
// });

api.interceptors.response.use((response: any) => {
  if (response.data.statusCode < 200 || response.data.statusCode >= 300)
    throw new Error(response.data.message);
  return response;
});

const http = {
  get: (url: string, config: any) => {
    console.log("Url", url, config);
    return api.get(url, {
      headers: {
        ...defaultHeaders,
      },
      ...config,
    });
  },
  post: (url: string, body: any, config?: any) => {
    console.log("Url", url, body);
    return api.post(url, body, {
      headers: {
        ...defaultHeaders,
      },
      ...config,
    });
  },
  put: (url: string, body: any, config: any) =>
    api.put(url, body, {
      headers: {
        ...defaultHeaders,
      },
      ...config,
    }),
  delete: (url: string, body: any, config: any) =>
    api.delete(url, {
      headers: {
        ...defaultHeaders,
      },
      ...config,
      data: body,
    }),
};

export default http;
