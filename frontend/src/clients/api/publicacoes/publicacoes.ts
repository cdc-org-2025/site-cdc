import { IArea } from "../areas";

export interface IPublicacao {
  areas: IArea[]
  documento_url: string;
  id: number;
  imagens: []
  titulo: string;
  url_imagem: string
}

export interface IPublicacaoResponse {
  data: IPublicacao[]
  areas_filtro: IArea[]
}