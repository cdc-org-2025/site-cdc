import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getBannerPagina } from './banner.api';
import { IBanner } from './banner';

export const useBannerQuery = (pagina: string, options?: UseQueryOptions<IBanner[], Error>) => {
  return useQuery<IBanner[], Error>({
    queryKey: ['contato', pagina],
    queryFn: () => getBannerPagina(pagina),
    enabled: !!pagina,
    ...options,
  });
};