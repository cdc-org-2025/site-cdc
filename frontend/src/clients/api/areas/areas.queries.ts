import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getArea, getListAreas } from './areas.api';
import { IArea } from './areas.types';

export const useAreasQuery = (options?: UseQueryOptions<IArea[], Error>) => {
  return useQuery<IArea[], Error>({
    queryKey: ['areas'],
    queryFn: getListAreas,
    ...options,
  });
};

export const useAreaQuery = (id: number, options?: UseQueryOptions<IArea, Error>) => {
  return useQuery<IArea, Error>({
    queryKey: ['area', id],
    queryFn: () => getArea(id),
    enabled: !!id,
    ...options,
  });
};
