import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListPerguntas } from './pergunta';
import { IPerguntas } from './perguntas';

export const useInscricoesQuery = (options?: UseQueryOptions<IPerguntas[], Error>) => {
  return useQuery<IPerguntas[], Error>({
    queryKey: ['linha-tempo'],
    queryFn: getListPerguntas,
    ...options,
  });
};

