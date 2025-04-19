import apiData from '@/clients/axiosClient/apiData';
import { ICategoria } from './categoria.types';

const api = apiData()

export const getListCategorias = async (): Promise<ICategoria[]> => {
  const { data } = await api.get('/categorias');
  return data;
};

export const getCategoria = async (id: number): Promise<ICategoria> => {
  const { data } = await api.get(`/categorias/${id}`);
  return data;
};
