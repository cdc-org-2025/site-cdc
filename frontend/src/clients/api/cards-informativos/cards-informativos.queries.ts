import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListCardsInformativos } from './cards-informativos.api';
import { ICardsInfo } from './cards-informativos.types';

export const useCardsInformativosListQuery = (options?: UseQueryOptions<ICardsInfo[], Error>) => {
  return useQuery<ICardsInfo[], Error>({
    queryKey: ['cards-informativos'],
    queryFn: getListCardsInformativos,
    ...options,
  });
};
