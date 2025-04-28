export interface IMenu {
  id: number
  label: string
  link?: string
  subMenus?: ISubMenu[]
}

export interface ISubMenu {
  id: number
  label: string
  scrollView?: string
  link?: string
}

export const MenuOptions = [
  {
    id: 0,
    label: 'Início',
    link: '/',
  },
  {
    id: 1,
    label: 'Institucional',
    subMenus: [
      { id: 10, label: 'Linha do tempo', scrollView: 'timeline' },
      { id: 11, label: 'Organização do CDC', scrollView: 'organizationCdc' },
      { id: 12, label: 'Lideranças', scrollView: 'leadership' },
      { id: 13, label: 'Transparência', scrollView: 'transparent' },
      { id: 14, label: 'Perguntas Frequentes', scrollView: 'faq' },
      { id: 15, label: 'Trabalhe Conosco', link: 'trabalhe-conosco' },
    ],
  },
  {
    id: 2,
    label: 'Programas',
    subMenus: [
      {
        id: 20,
        label: 'Programa de Promoção dos Direitos da Pessoa Idosa (PPDPI)',
        link: '/',
      },
      { id: 21, label: 'Apoio Técnico aos Municípios (ATM)', link: '/' },
      { id: 22, label: 'Programa Atitude', link: '/' },
    ],
  },
  {
    id: 3,
    label: 'Informe-se',
    subMenus: [
      { id: 30, label: 'Notícias', link: 'noticias' },
      { id: 31, label: 'Publicações', link: 'publicacoes' },
    ],
  },
  {
    id: 4,
    label: 'Contato',
    link: '/contato',
  },
]
