import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListIndicadores } from './indicadores.api';
import { IIndicadores } from './indicadores';

export const useIndicadoresQuery = (options?: UseQueryOptions<IIndicadores[], Error>) => {
  return useQuery<IIndicadores[], Error>({
    queryKey: ['indicadores'],
    queryFn: getListIndicadores,
    ...options,
  });
};
