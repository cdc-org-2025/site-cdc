import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListRodape } from './rodape.api';
import { IRodape } from './rodape.types';

export const useRodapeQuery = (options?: UseQueryOptions<IRodape[], Error>) => {
  return useQuery<IRodape[], Error>({
    queryKey: ['rodape'],
    queryFn: getListRodape,
    ...options,
  });
};
