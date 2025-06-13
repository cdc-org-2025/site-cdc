// hook.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { IConteudoSecao } from './conteudo-secao';
import { getConteudoSecao } from './conteudo-secao.api';

export const useConteudoSecaoQuery = (secao: string, options?: UseQueryOptions<IConteudoSecao[], Error>) => {
  return useQuery<IConteudoSecao[], Error>({
    queryKey: ['noticia', secao],
    queryFn: () => getConteudoSecao(secao),
    enabled: !!secao,
    ...options,
  });
};