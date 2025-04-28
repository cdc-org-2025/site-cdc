export interface IPrograma {
  id: number
  imagem_capa: string
  titulo: string
  descricao: string
  imagens: [
    {
      url_imagem: string
    }
  ],
  area: string
}

export interface IProgramList {
  programas: [
    {
      id: number
      titulo: string
      subTitulo: string
      descricao: string
      url_imagem: string
    }
  ]
  qtd_programas: number
}