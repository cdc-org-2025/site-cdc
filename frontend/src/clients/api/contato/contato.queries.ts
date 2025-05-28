import { useQuery, UseQueryOptions, useMutation } from '@tanstack/react-query';
import { getListContatos, getContato, postContato } from './contato.api';
import { IContato } from './contato';

export const useContatosQuery = (options?: UseQueryOptions<IContato[], Error>) => {
  return useQuery<IContato[], Error>({
    queryKey: ['contatos'],
    queryFn: getListContatos,
    ...options,
  });
};

export const useContatoQuery = (id: number, options?: UseQueryOptions<IContato, Error>) => {
  return useQuery<IContato, Error>({
    queryKey: ['contato', id],
    queryFn: () => getContato(id),
    enabled: !!id,
    ...options,
  });
};

export const useContatoMutation = () => {
  return useMutation<{ message: string }, Error, any>({
    mutationFn: postContato,
  });
};
