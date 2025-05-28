// hook.ts
import { useMutation } from '@tanstack/react-query';
import { postCandidatura } from './candidatura.api';

export const useCandidaturaMutation = () => {
  return useMutation<{ message: string }, Error, any>({
    mutationFn: postCandidatura,
  });
};
