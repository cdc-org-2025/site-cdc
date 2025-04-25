import axios from "axios";

export default function apiData() {
  const api = axios.create({
    baseURL: `${process.env.baseUrlDomain}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return api;
}