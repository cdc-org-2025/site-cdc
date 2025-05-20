import axios from "axios";

export default function apiData() {
  const api = axios.create({
    baseURL: `${process.env.baseUrlDomain}`,
  });
  return api;
}