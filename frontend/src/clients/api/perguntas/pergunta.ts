import apiData from '@/clients/axiosClient/apiData';
import { IPerguntas } from './perguntas';

const api = apiData()

export const getListPerguntas = async (): Promise<IPerguntas[]> => {
  const { data } = await api.get('/perguntas');
  return data;
};
