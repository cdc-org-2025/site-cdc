import apiData from '@/clients/axiosClient/apiData';
import { IPrograma } from './programas';

const api = apiData()

export const getListProgramas = async (): Promise<IPrograma[]> => {
  const { data } = await api.get('/programas');
  return data;
};

export const getPrograma = async (id: number): Promise<IPrograma> => {
  const { data } = await api.get(`/programas/${id}`);
  return data;
};
