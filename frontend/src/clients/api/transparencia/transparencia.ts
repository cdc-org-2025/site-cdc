export interface ITransparencia {
  id: number;
  titulo: string;
  url_imagem: string
  documento_url?: string
  area: { id: number, nome: string }[];
}
