import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ILideranca, ILiderancaResponse } from './liderancas.types';
import { getLideranca, getListLiderancas, getListLiderancasArea } from './liderancas.api';

export const useLiderancasAreaQuery = (area_id: number, options?: UseQueryOptions<ILideranca[], Error>) => {
  return useQuery<ILideranca[], Error>({
    queryKey: ['liderancas', area_id],
    queryFn: () => getListLiderancasArea(area_id),
    ...options,
  });
};

export const useLiderancasListQuery = (options?: UseQueryOptions<ILiderancaResponse, Error>) => {
  return useQuery<ILiderancaResponse, Error>({
    queryKey: ['liderancas'],
    queryFn: () => getListLiderancas(),
    ...options,
  });
};

export const useLiderancasQuery = (id: number, options?: UseQueryOptions<ILideranca, Error>) => {
  return useQuery<ILideranca, Error>({
    queryKey: ['lideranca', id],
    queryFn: () => getLideranca(id),
    enabled: !!id,
    ...options,
  });
};
