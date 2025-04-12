import apiData from '../apiData';
import Cookies from "js-cookie";

export const getRequest = async (url: string, params?: any) => {
  const token = Cookies.get('user-info');
  const userToken = token ? JSON.parse(token) : null;

  if (!userToken) {
    throw new Error('Token de usuário não encontrado');
  }

  try {
    const api = apiData(userToken?.token_access);

    const { data } = await api.get(url, {
      params: params
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const postRequest = async (url: string, body: any) => {
  const token = Cookies.get('user-info');
  const userToken = token ? JSON.parse(token) : null;

  if (!userToken) {
    throw new Error('Token de usuário não encontrado');
  }

  try {
    const api = apiData(userToken?.token_access);

    const { data } = await api.post(url, body);

    return data;
  } catch (error) {
    throw error;
  }
}
