import apiData from '@/clients/axiosClient/apiData';
import { IBanner } from './banner';

const api = apiData()

export const getBannerPagina = async (pagina: string): Promise<IBanner[]> => {
  const { data } = await api.get(`/banner?pagina=${pagina}`);
  return data;
};
