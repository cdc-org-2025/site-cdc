import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getDadosBancarios } from './dados-bancarios.api';
import { IDadosBancarios } from './dados-bancarios';

export const useDadosBancariosQuery = (options?: UseQueryOptions<IDadosBancarios[], Error>) => {
  return useQuery<IDadosBancarios[], Error>({
    queryKey: ['dados-bancarios'],
    queryFn: getDadosBancarios,
    ...options,
  });
};
