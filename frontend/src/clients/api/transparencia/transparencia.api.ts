import apiData from '@/clients/axiosClient/apiData';
import { ITransparencia } from './transparencia';

const api = apiData()

export const getListTransparencia = async (): Promise<ITransparencia[]> => {
  const { data } = await api.get('/transparencia');
  return data;
};

export const getTransparencia = async (id: number): Promise<ITransparencia> => {
  const { data } = await api.get(`/transparencia/${id}`);
  return data;
};
