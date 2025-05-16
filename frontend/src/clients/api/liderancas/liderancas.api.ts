import apiData from '@/clients/axiosClient/apiData';
import { ILideranca } from './liderancas.types';

const api = apiData()

export const getListLiderancasArea = async (area_id: number): Promise<ILideranca[]> => {
  const { data } = await api.get(`/liderancas?area_id${area_id}`);
  return data;
};

export const getListLiderancas = async (): Promise<ILideranca[]> => {
  const { data } = await api.get(`/liderancas`);
  return data;
};

export const getLideranca = async (id: number): Promise<ILideranca> => {
  const { data } = await api.get(`/liderancas/${id}`);
  return data;
};
