import apiData from '@/clients/axiosClient/apiData';
import { ICardsInfo } from './cards-informativos.types';

const api = apiData()

export const getListCardsInformativos = async (): Promise<ICardsInfo[]> => {
  const { data } = await api.get('/cards-informativos');
  return data;
};
