import apiData from '@/clients/axiosClient/apiData';
import { IInscricoes } from './inscricoes';

const api = apiData()

export const getListInscricoes = async (): Promise<IInscricoes[]> => {
  const { data } = await api.get('/inscricoes');
  return data;
};

export const getIncricoes = async (id: number): Promise<IInscricoes> => {
  const { data } = await api.get(`/inscricoes/${id}`);
  return data;
};
