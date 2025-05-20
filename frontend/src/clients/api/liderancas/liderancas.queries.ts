import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ILideranca } from './liderancas.types';
import { getLideranca, getListLiderancas, getListLiderancasArea } from './liderancas.api';

export const useLiderancasAreaQuery = (area_id: number, options?: UseQueryOptions<ILideranca[], Error>) => {
  return useQuery<ILideranca[], Error>({
    queryKey: ['colaboradores', area_id],
    queryFn: () => getListLiderancasArea(area_id),
    ...options,
  });
};

export const useLiderancasListQuery = (options?: UseQueryOptions<ILideranca[], Error>) => {
  return useQuery<ILideranca[], Error>({
    queryKey: ['colaboradores'],
    queryFn: () => getListLiderancas(),
    ...options,
  });
};

export const useLiderancasQuery = (id: number, options?: UseQueryOptions<ILideranca, Error>) => {
  return useQuery<ILideranca, Error>({
    queryKey: ['colaborador', id],
    queryFn: () => getLideranca(id),
    enabled: !!id,
    ...options,
  });
};
