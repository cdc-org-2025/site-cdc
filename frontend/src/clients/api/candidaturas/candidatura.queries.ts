// hook.ts
import { useMutation } from '@tanstack/react-query';
import { postCandidatura } from './candidatura.api';
import { ICandidatura } from './candidatura';

export const useCandidaturaMutation = () => {
  return useMutation<ICandidatura, Error, ICandidatura>({
    mutationFn: postCandidatura,
  });
};
