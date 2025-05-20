import { IArea } from "../areas";

export interface ILideranca {
  id: number;
  nome: string;
  cargo: string;
  url_imagem: string
  email: string
  areas: IArea[]
}

export interface ILiderancaResponse {
  data: ILideranca[]
  areas_filtro: IArea[]
}