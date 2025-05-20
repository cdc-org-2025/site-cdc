import apiData from '@/clients/axiosClient/apiData';
import { IContato, IPostContato } from './contato';

const api = apiData()

export const getListContatos = async (): Promise<IContato[]> => {
  const { data } = await api.get('/contato');
  return data;
};

export const getContato = async (id: number): Promise<IContato> => {
  const { data } = await api.get(`/contato/${id}`);
  return data;
};

export const postContato = async (payload: IPostContato): Promise<any> => {
  const formData = new FormData();
  formData.append('nome', payload.nome);
  formData.append('email', payload.email);
  formData.append('mensagem', payload.mensagem);
  formData.append('motivo', payload.motivo);

  const { data } = await api.post('/contato', formData);
  return data;
};