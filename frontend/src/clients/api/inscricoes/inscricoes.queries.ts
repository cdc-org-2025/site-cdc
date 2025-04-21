import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListInscricoes, getIncricoes } from './inscricoes.api';
import { IInscricoes } from './inscricoes';

export const useInscricoesQuery = (options?: UseQueryOptions<IInscricoes[], Error>) => {
  return useQuery<IInscricoes[], Error>({
    queryKey: ['inscricoes'],
    queryFn: getListInscricoes,
    ...options,
  });
};

export const useInscricaoQuery = (id: number, options?: UseQueryOptions<IInscricoes, Error>) => {
  return useQuery<IInscricoes, Error>({
    queryKey: ['inscricoes', id],
    queryFn: () => getIncricoes(id),
    enabled: !!id,
    ...options,
  });
};
