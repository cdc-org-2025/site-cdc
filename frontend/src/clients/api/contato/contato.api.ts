import apiData from '@/clients/axiosClient/apiData';
import { IContato } from './contato';

const api = apiData()

export const getListContatos = async (): Promise<IContato[]> => {
  const { data } = await api.get('/contato');
  return data;
};

export const getContato = async (id: number): Promise<IContato> => {
  const { data } = await api.get(`/contato/${id}`);
  return data;
};
