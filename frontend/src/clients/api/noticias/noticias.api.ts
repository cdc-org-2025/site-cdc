import apiData from '@/clients/axiosClient/apiData';
import { INoticiaArea, INoticias, INoticiasShowNews } from './noticias';
import { buildQueryParams } from '@/utils/buildQueryParams';

const api = apiData()

export const getListNoticias = async (): Promise<INoticias[]> => {
  const { data } = await api.get('/noticias');
  return data;
};

export const getNoticia = async (id: number): Promise<INoticias> => {
  const { data } = await api.get(`/noticias/${id}`);
  return data;
};

export const getNoticiaArea = async (area: number): Promise<INoticiaArea[]> => {
  const params = buildQueryParams({ area });

  const { data } = await api.get(`/noticias/area`, { params });
  return data;
};

export const getShowNews = async (id?: number, area_id?: number): Promise<INoticiasShowNews[]> => {
  const params = buildQueryParams({ id, area_id });

  const { data } = await api.get('/noticias/show-news', { params });
  return data;
};