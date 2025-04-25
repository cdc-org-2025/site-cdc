import apiData from '@/clients/axiosClient/apiData';
import { IParceiro } from './parceiros';

const api = apiData()

export const getListParceiros = async (): Promise<IParceiro[]> => {
  const { data } = await api.get('/parceiros');
  return data;
};

