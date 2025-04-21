import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getCategoria, getListCategorias } from './categoria.api';
import { ICategoria } from './categoria.types';

export const useCategoriasQuery = (options?: UseQueryOptions<ICategoria[], Error>) => {
  return useQuery<ICategoria[], Error>({
    queryKey: ['categorias'],
    queryFn: getListCategorias,
    ...options,
  });
};

export const useCategoriaQuery = (id: number, options?: UseQueryOptions<ICategoria, Error>) => {
  return useQuery<ICategoria, Error>({
    queryKey: ['categoria', id],
    queryFn: () => getCategoria(id),
    enabled: !!id,
    ...options,
  });
};
