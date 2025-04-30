import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getColaborador, getListColaboradores, getListColaboradoresArea } from './colaboradores.api';
import { IColaborador } from './colaboradores.types';

export const useColaboradoresAreaQuery = (area_id: number, options?: UseQueryOptions<IColaborador[], Error>) => {
  return useQuery<IColaborador[], Error>({
    queryKey: ['colaboradores', area_id],
    queryFn: () => getListColaboradoresArea(area_id),
    ...options,
  });
};

export const useColaboradoresQuery = (options?: UseQueryOptions<IColaborador[], Error>) => {
  return useQuery<IColaborador[], Error>({
    queryKey: ['colaboradores'],
    queryFn: () => getListColaboradores(),
    ...options,
  });
};

export const useColaboradorQuery = (id: number, options?: UseQueryOptions<IColaborador, Error>) => {
  return useQuery<IColaborador, Error>({
    queryKey: ['colaborador', id],
    queryFn: () => getColaborador(id),
    enabled: !!id,
    ...options,
  });
};
