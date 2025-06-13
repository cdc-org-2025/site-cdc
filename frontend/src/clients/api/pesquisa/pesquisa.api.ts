import apiData from '@/clients/axiosClient/apiData';
import { buildQueryParams } from '@/utils/buildQueryParams';
import { IResponsePesquisa } from './pesquisa';

const api = apiData()

export const getPesquisasList = async (q: string | null): Promise<IResponsePesquisa> => {
  const params = buildQueryParams({ q });

  const { data } = await api.get(`/pesquisa`, { params });
  return data;
};
