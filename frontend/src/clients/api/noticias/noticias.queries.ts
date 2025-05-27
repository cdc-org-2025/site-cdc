import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getListNoticias, getNoticia, getNoticiasArea } from './noticias.api';
import { INoticias, INoticiasResponse } from './noticias';

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

export const useNoticiasAreaQuery = (
  params: { area_id?: string },
  options?: UseQueryOptions<INoticiasResponse, Error>
) => {
  return useQuery<INoticiasResponse, Error>({
    queryKey: ['noticias-area', params],
    queryFn: () => getNoticiasArea(params.area_id),
    enabled: !!params,
    ...options,
  });
};
