import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListPublicacoes, getPublicacao } from './publicacoes.api';
import { IPublicacao, IPublicacaoResponse } from './publicacoes';

export const usePublicacoesQuery = (options?: UseQueryOptions<IPublicacaoResponse, Error>) => {
  return useQuery<IPublicacaoResponse, Error>({
    queryKey: ['publicacoes'],
    queryFn: getListPublicacoes,
    ...options,
  });
};

export const usePublicacaoQuery = (id: number, options?: UseQueryOptions<IPublicacao, Error>) => {
  return useQuery<IPublicacao, Error>({
    queryKey: ['publicacao', id],
    queryFn: () => getPublicacao(id),
    enabled: !!id,
    ...options,
  });
};
