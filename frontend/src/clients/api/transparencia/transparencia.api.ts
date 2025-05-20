import apiData from '@/clients/axiosClient/apiData';
import { ITransparencia, ITransparenciaResponse } from './transparencia';

const api = apiData()

export const getListTransparencia = async (): Promise<ITransparenciaResponse> => {
  const { data } = await api.get('/transparencia');
  return data;
};

export const getTransparencia = async (id: number): Promise<ITransparencia> => {
  const { data } = await api.get(`/transparencia/${id}`);
  return data;
};
