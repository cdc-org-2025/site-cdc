import apiData from '@/clients/axiosClient/apiData';
import { IConteudoSecao } from './conteudo-secao';
import { buildQueryParams } from '@/utils/buildQueryParams';

const api = apiData()

export const getConteudoSecao = async (secao: string): Promise<IConteudoSecao[]> => {
  const params = buildQueryParams({ secao });

  const { data } = await api.get(`/conteudo-secao`, { params });
  return data;
};