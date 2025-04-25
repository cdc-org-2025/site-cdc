import apiData from '@/clients/axiosClient/apiData';
import { ILinhaTempo } from './linha-tempo';

const api = apiData()

export const getLinhaTempo = async (): Promise<ILinhaTempo[]> => {
  const { data } = await api.get('/linha-tempo');
  return data;
};
