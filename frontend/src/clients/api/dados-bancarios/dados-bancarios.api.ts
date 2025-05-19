import apiData from '@/clients/axiosClient/apiData';
import { IDadosBancarios } from './dados-bancarios';

const api = apiData()

export const getDadosBancarios = async (): Promise<IDadosBancarios[]> => {
  const { data } = await api.get('/dados-bancario');
  return data;
};
