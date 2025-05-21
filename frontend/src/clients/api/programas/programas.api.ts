import apiData from '@/clients/axiosClient/apiData';
import { IPrograma, IProgramResponse } from './programas';

const api = apiData()

export const getListProgramas = async (): Promise<IProgramResponse> => {
  const { data } = await api.get('/programas');
  return data;
};

export const getPrograma = async (id: string | string[]): Promise<IPrograma> => {
  const { data } = await api.get(`/programas/${id}`);
  return data;
};
