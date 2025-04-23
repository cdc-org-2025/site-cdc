import apiData from '@/clients/axiosClient/apiData';
import { IOportunidade } from './oportunidades';

const api = apiData()

export const getListOportunidades = async (): Promise<IOportunidade[]> => {
  const { data } = await api.get('/oportunidades');
  return data;
};

export const getOportunidade = async (id: number): Promise<IOportunidade> => {
  const { data } = await api.get(`/oportunidades/${id}`);
  return data;
};
