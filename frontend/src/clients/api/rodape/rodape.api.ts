import apiData from '@/clients/axiosClient/apiData';
import { IRodape } from './rodape.types';

const api = apiData()

export const getListRodape = async (): Promise<IRodape[]> => {
  const { data } = await api.get('/rodape');
  return data;
};
