export interface IPrograma {
  area_id: number
  descricao: string
  id: number
  subtitulo: string
  titulo: string
  url_image_capa: string
}

export interface IProgramList {
  programas: IPrograma[]
}