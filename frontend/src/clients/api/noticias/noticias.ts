import { IArea } from "../areas"

export interface INoticias {
  id: number
  titulo?: string
  tempo_leitura: string
  tipo: string
  imagem_capa: string
  autor: string
  data_publicacao: string
  conteudo: string
  html_original: string
  areas: IArea[]
  imagens: []
  categorias: []
}
export interface INoticiasResponse {
  data: INoticias[]
  areas_filtro: IArea[]
}
export interface INoticiaArea {
  url_imagem: string,
  area: string,
  titulo: string
}

export interface INoticiasShowNews {
  id: number;
  titulo: string;
  area_id: number;
}