export interface ILideranca {
  id: number;
  nome: string;
  cargo: string;
  url_imagem: string
  email: string
  areas: {
    id: number
    nome: string
  }[]
}