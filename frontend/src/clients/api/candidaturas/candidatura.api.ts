import apiData from '@/clients/axiosClient/apiData';
import { ICandidatura } from './candidatura';

const api = apiData()

export const postCandidatura = async (payload: ICandidatura): Promise<{ message: string }> => {
  const formData = new FormData();
  formData.append('nome', payload.nome);
  formData.append('email', payload.email);
  formData.append('mensagem', payload.mensagem);
  formData.append('anexo', payload.anexo);
  formData.append('titulo_vaga', payload.tituloVaga);

  const { data } = await api.post('/candidatura', formData);
  return data;
};
