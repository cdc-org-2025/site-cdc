import apiData from '@/clients/axiosClient/apiData';
import { IColaborador } from './colaboradores.types';

const api = apiData()

export const getListColaboradoresArea = async (): Promise<IColaborador[]> => {
  const { data } = await api.get('/colaboradores/areas');
  return data;
};

export const getColaborador = async (id: number): Promise<IColaborador> => {
  const { data } = await api.get(`/colaboradores/${id}`);
  return data;
};
