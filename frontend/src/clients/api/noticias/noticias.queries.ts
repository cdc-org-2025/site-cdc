import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListNoticias, getNoticia, getShowNews } from './noticias.api';
import { INoticias, INoticiasShowNews } from './noticias';

export const useNoticiasQuery = (options?: UseQueryOptions<INoticias[], Error>) => {
  return useQuery<INoticias[], Error>({
    queryKey: ['noticias'],
    queryFn: getListNoticias,
    ...options,
  });
};

export const useNoticiaQuery = (id: number, options?: UseQueryOptions<INoticias, Error>) => {
  return useQuery<INoticias, Error>({
    queryKey: ['noticia', id],
    queryFn: () => getNoticia(id),
    enabled: !!id,
    ...options,
  });
};

export const useShowNewsQuery = (
  params: { id?: number, area_id?: number },
  options?: UseQueryOptions<INoticiasShowNews[], Error>
) => {
  return useQuery<INoticiasShowNews[], Error>({
    queryKey: ['noticias-show-news', params],
    queryFn: () => getShowNews(params.id, params.area_id),
    enabled: !!params,
    ...options,
  });
};
