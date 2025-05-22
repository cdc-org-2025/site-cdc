import apiData from '@/clients/axiosClient/apiData';
import { IIndicadores } from './indicadores';

const api = apiData()

export const getListIndicadores = async (): Promise<IIndicadores[]> => {
  const { data } = await api.get('/indicadores');
  return data;
};
