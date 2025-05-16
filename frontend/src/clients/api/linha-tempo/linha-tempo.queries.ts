import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getLinhaTempo } from './linha-tempo.api';
import { ILinhaTempo } from './linha-tempo';

export const useTimeLineQuery = (options?: UseQueryOptions<ILinhaTempo[], Error>) => {
  return useQuery<ILinhaTempo[], Error>({
    queryKey: ['linha-tempo'],
    queryFn: getLinhaTempo,
    ...options,
  });
};
