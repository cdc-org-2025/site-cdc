import apiData from '@/clients/axiosClient/apiData';
import { IArea } from './areas.types';

const api = apiData()

export const getListAreas = async (): Promise<IArea[]> => {
  const { data } = await api.get('/areas');
  return data;
};

export const getArea = async (id: number): Promise<IArea> => {
  const { data } = await api.get(`/areas/${id}`);
  return data;
};
