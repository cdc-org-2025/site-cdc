import axios from "axios";

export default function apiData() {
  const api = axios.create({
    baseURL: `${process.env.baseUrlDomain}`,
  });

  api.interceptors.request.use(config => {
    const isFormData = config.data instanceof FormData;

    if (!isFormData) {
      config.headers['Content-Type'] = 'application/json; charset=utf-8';
    }

    return config;
  });

  return api;
}