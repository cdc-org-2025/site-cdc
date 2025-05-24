import apiData from '@/clients/axiosClient/apiData';
import { IOrganizacao } from './organizacao';

const api = apiData()

export const getListOrganizacao = async (): Promise<IOrganizacao[]> => {
  const { data } = await api.get('/organizacao');
  return data;
};
