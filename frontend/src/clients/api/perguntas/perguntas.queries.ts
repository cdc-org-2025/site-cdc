import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListPerguntas } from './pergunta';
import { IPerguntas } from './perguntas';

export const usePerguntasQuery = (options?: UseQueryOptions<IPerguntas[], Error>) => {
  return useQuery<IPerguntas[], Error>({
    queryKey: ['perguntas'],
    queryFn: getListPerguntas,
    ...options,
  });
};
