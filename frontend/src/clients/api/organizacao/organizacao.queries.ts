import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListOrganizacao } from './organizacao.api';
import { IOrganizacao } from './organizacao';

export const useOrganizacaoListQuery = (options?: UseQueryOptions<IOrganizacao[], Error>) => {
  return useQuery<IOrganizacao[], Error>({
    queryKey: ['contatos'],
    queryFn: getListOrganizacao,
    ...options,
  });
};
