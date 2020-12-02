import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token) config.headers["x-auth-token"] = token;
  return config;
});

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => res.data;

const request = {
  get: (url) => axios.get(url).then(handleResponse),
  post: (url, data) => axios.post(url, data, config).then(handleResponse),
  put: (url, data) => axios.put(url, data, config).then(handleResponse),
  delete: (url) => axios.delete(url).then(handleResponse),
};

export default request;
