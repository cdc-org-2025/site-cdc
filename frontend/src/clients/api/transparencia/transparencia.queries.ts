import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListTransparencia, getTransparencia, getTransparenciaArea } from './transparencia.api';
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

export const useTransparenciaAreaQuery = (
  params: { area_id?: string },
  options?: UseQueryOptions<ITransparenciaResponse, Error>
) => {
  return useQuery<ITransparenciaResponse, Error>({
    queryKey: ['transparencia-area', params],
    queryFn: () => getTransparenciaArea(params.area_id),
    enabled: !!params,
    ...options,
  });
};
