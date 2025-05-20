import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListNoticias, getNoticia, getNoticiaArea, getShowNews } from './noticias.api';
import { INoticiaArea, INoticias, INoticiasResponse, INoticiasShowNews } from './noticias';

export const useNoticiasListQuery = (options?: UseQueryOptions<INoticiasResponse, Error>) => {
  return useQuery<INoticiasResponse, Error>({
    queryKey: ['noticias'],
    queryFn: getListNoticias,
    ...options,
  });
};

export const useNoticiaQuery = (id: string | string[], options?: UseQueryOptions<INoticias, Error>) => {
  return useQuery<INoticias, Error>({
    queryKey: ['noticia', id],
    queryFn: () => getNoticia(id),
    enabled: !!id,
    ...options,
  });
};

export const useNoticiasAreaQuery = (area: number, options?: UseQueryOptions<INoticiaArea[], Error>) => {
  return useQuery<INoticiaArea[], Error>({
    queryKey: ['noticia-area', area],
    queryFn: () => getNoticiaArea(area),
    enabled: !!area,
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
