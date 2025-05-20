import { IArea } from "../areas";

export interface ITransparencia {
  id: number;
  titulo: string;
  url_imagem: string
  documento_url?: string
  areas: IArea[]
}

export interface ITransparenciaResponse {
  data: ITransparencia[]
  area_filtro: IArea[]
}