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
  areas: IAreas[]
  imagens: []
  categorias: []
}

interface IAreas {
  id: number
  nome: string
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