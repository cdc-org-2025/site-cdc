import apiData from '@/clients/axiosClient/apiData';
import { IColaborador } from './colaboradores.types';

const api = apiData()

export const getListColaboradoresArea = async (area_id: number): Promise<IColaborador[]> => {
  const { data } = await api.get(`/colaboradores?area_id${area_id}`);
  return data;
};

export const getListColaboradores = async (): Promise<IColaborador[]> => {
  const { data } = await api.get(`/colaboradores`);
  return data;
};

export const getColaborador = async (id: number): Promise<IColaborador> => {
  const { data } = await api.get(`/colaboradores/${id}`);
  return data;
};
