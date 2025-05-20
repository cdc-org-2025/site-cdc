import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListTransparencia, getTransparencia } from './transparencia.api';
import { ITransparencia, ITransparenciaResponse } from './transparencia';

export const useListTransparenciaQuery = (options?: UseQueryOptions<ITransparenciaResponse, Error>) => {
  return useQuery<ITransparenciaResponse, Error>({
    queryKey: ['transparencia'],
    queryFn: getListTransparencia,
    ...options,
  });
};

export const useTransparenciaQuery = (id: number, options?: UseQueryOptions<ITransparencia, Error>) => {
  return useQuery<ITransparencia, Error>({
    queryKey: ['transparencia', id],
    queryFn: () => getTransparencia(id),
    enabled: !!id,
    ...options,
  });
};
