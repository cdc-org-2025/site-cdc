export interface INoticias {
  id: number
  titulo: string
  imagem_capa: string
  tipo: string
  autor: string
  tempo_leitura: number
  data_publicacao: string
  conteudo: IConteudoNoticia[]
  area_id: number
}

export interface IConteudoNoticia {
  type: string,
  content: string,
  html: string
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