import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListOportunidades, getOportunidade } from './oportunidades.api';
import { IOportunidade } from './oportunidades';

export const useOportunidadesListQuery = (options?: UseQueryOptions<IOportunidade[], Error>) => {
  return useQuery<IOportunidade[], Error>({
    queryKey: ['oportunidades'],
    queryFn: getListOportunidades,
    ...options,
  });
};

export const useOportunidadeQuery = (id: string | string[], options?: UseQueryOptions<IOportunidade, Error>) => {
  return useQuery<IOportunidade, Error>({
    queryKey: ['oportunidade', id],
    queryFn: () => getOportunidade(id),
    enabled: !!id,
    ...options,
  });
};
