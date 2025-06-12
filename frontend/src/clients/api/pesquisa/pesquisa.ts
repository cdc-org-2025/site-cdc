import { IArea } from "../areas"

export interface IPesquisa {
  id: number
  titulo?: string
  tipo: string
  imagem_capa: string
  areas: IArea[]
}

export interface IResponsePesquisa {
  data: IPesquisa[]
  areas_filtro: IArea[]
}
