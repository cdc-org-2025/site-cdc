import apiData from '@/clients/axiosClient/apiData';
import { IPublicacao, IPublicacaoResponse } from './publicacoes';

const api = apiData()

export const getListPublicacoes = async (): Promise<IPublicacaoResponse> => {
  const { data } = await api.get('/publicacoes');
  return data;
};

export const getPublicacao = async (id: number): Promise<IPublicacao> => {
  const { data } = await api.get(`/publicacoes/${id}`);
  return data;
};
