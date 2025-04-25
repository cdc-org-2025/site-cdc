import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListParceiros } from './parceiros.api';
import { IParceiro } from './parceiros';

export const useInscricoesQuery = (options?: UseQueryOptions<IParceiro[], Error>) => {
  return useQuery<IParceiro[], Error>({
    queryKey: ['parceiros'],
    queryFn: getListParceiros,
    ...options,
  });
};

