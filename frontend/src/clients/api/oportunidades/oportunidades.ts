export interface IOportunidade {
  id: number;
  titulo: string
  descricao: string
  elements: [
    {
      type: string
      content: string
      html: string
    }
  ]
}