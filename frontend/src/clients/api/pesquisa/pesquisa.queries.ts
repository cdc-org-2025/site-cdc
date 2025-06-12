import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getPesquisasList } from './pesquisa.api';
import { IResponsePesquisa } from './pesquisa';

export const usePesquisaQuery = (
  params: string | null,
  options?: UseQueryOptions<IResponsePesquisa, Error>
) => {
  return useQuery<IResponsePesquisa, Error>({
    queryKey: ['pesquisa', params],
    queryFn: () => getPesquisasList(params),
    enabled: !!params,
    ...options,
  });
};
