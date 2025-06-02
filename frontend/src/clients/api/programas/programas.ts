export interface IPrograma {
  area_id: number
  descricao: string
  id: number
  subtitulo: string
  titulo: string
  url_image_capa: string
  conteudo: string
  resumo: string
  areas: { id: number, nome: string }[]
  is_ativo: boolean
  imagens: {
    id: number
    url_imagem: string
  }[]
}

export interface IProgramList {
  programas: IPrograma[]
}

export interface IProgramResponse {
  data: IPrograma[]
  areas_filtro: { id: number, nome: string }[]
}