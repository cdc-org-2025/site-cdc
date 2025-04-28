export interface INoticias {
  id: number
  imagem_capa: string
  autor: string
  minutoLeitura: number
  dataCreate: string
  elements: IElementsNoticia[]
  htmlOriginal: string
}

export interface IElementsNoticia {
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