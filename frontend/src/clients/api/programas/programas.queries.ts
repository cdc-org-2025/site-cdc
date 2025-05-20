import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListProgramas, getPrograma } from './programas.api';
import { IPrograma } from './programas';

export const useProgramasListQuery = (options?: UseQueryOptions<IPrograma[], Error>) => {
  return useQuery<IPrograma[], Error>({
    queryKey: ['programas'],
    queryFn: getListProgramas,
    ...options,
  });
};

export const useProgramaQuery = (id: number, options?: UseQueryOptions<IPrograma, Error>) => {
  return useQuery<IPrograma, Error>({
    queryKey: ['programa', id],
    queryFn: () => getPrograma(id),
    enabled: !!id,
    ...options,
  });
};
