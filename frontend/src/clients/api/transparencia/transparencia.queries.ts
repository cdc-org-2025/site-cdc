import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListTransparencia, getTransparencia } from './transparencia.api';
import { ITransparencia } from './transparencia';

export const usePublicacoesQuery = (options?: UseQueryOptions<ITransparencia[], Error>) => {
  return useQuery<ITransparencia[], Error>({
    queryKey: ['publicacoes'],
    queryFn: getListTransparencia,
    ...options,
  });
};

export const usePublicacaoQuery = (id: number, options?: UseQueryOptions<ITransparencia, Error>) => {
  return useQuery<ITransparencia, Error>({
    queryKey: ['publicacao', id],
    queryFn: () => getTransparencia(id),
    enabled: !!id,
    ...options,
  });
};
