import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListProgramas, getListProgramasActive, getPrograma } from './programas.api';
import { IPrograma, IProgramResponse } from './programas';

export const useProgramasListQuery = (options?: UseQueryOptions<IProgramResponse, Error>) => {
  return useQuery<IProgramResponse, Error>({
    queryKey: ['programas'],
    queryFn: getListProgramas,
    ...options,
  });
};

export const useProgramasListAtivoQuery = (options?: UseQueryOptions<IProgramResponse, Error>) => {
  return useQuery<IProgramResponse, Error>({
    queryKey: ['programas-ativos'],
    queryFn: getListProgramasActive,
    ...options,
  });
};

export const useProgramaQuery = (id: string | string[], options?: UseQueryOptions<IPrograma, Error>) => {
  return useQuery<IPrograma, Error>({
    queryKey: ['programa', id],
    queryFn: () => getPrograma(id),
    enabled: !!id,
    ...options,
  });
};
