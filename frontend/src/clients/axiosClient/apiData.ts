import axios from "axios";

export default function apiData(token?: string) {
  const api = axios.create({
    baseURL: `${process.env.baseUrlDomain}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      "authorization": `Bearer ${token}`,
    }
  });
  return api;
}