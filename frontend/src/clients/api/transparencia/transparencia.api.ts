import apiData from '@/clients/axiosClient/apiData';
import { ITransparencia, ITransparenciaResponse } from './transparencia';
import { buildQueryParams } from '@/utils/buildQueryParams';

const api = apiData()

export const getListTransparencia = async (): Promise<ITransparenciaResponse> => {
  const { data } = await api.get('/transparencia');
  return data;
};

export const getTransparencia = async (id: number): Promise<ITransparencia> => {
  const { data } = await api.get(`/transparencia/${id}`);
  return data;
};

export const getTransparenciaArea = async (area_id?: string): Promise<ITransparenciaResponse> => {
  const params = buildQueryParams({ area_id });

  const { data } = await api.get('/transparencia', { params });
  return data;
};