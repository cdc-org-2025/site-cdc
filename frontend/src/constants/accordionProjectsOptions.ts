import ImageDefaultAccordion from '../assets/accordion-projects/default.svg'

export interface IAccordionProjectsOption {
  id: number
  title?: string
  description?: string
  content?: string
  link?: string
  image: React.ReactNode
}

export const AccordionProjectsOption = [
  {
    id: 1,
    title: 'PPCAM',
    description:
      'Programa de Proteção a Crianças e Adolescentes Ameaçados de Morte',
    content:
      'O PPCAAM, criado em 2003 e instituído pelo Decreto 6.231/2007, protege crianças e adolescentes ameaçados de morte, além de seus familiares. Presente no DF e em 16 estados, busca prevenir a letalidade infanto-juvenil e reinseri-los com segurança. Implementado pelo Governo Federal e OSCs, em PE é executado pelo CDC desde 2019, atuando no Recife e atendendo demandas em outros territórios.',
    link: '/',
    image: '',
  },
  {
    id: 2,
    title: 'PROVITA',
    description: 'Programa de vitalidade',
    content: 'O Provite lorem ipsum',
    link: '/',
    image: ImageDefaultAccordion.src,
  },
  {
    id: 3,
    title: 'MAIS VIDA',
    description: 'lorem ipsum',
    content: 'O Mais vida lorem ipsum',
    link: '/',
    image: '',
  },
  {
    id: 4,
    title: 'PPVIDA',
    description: 'Programa lorem impsum',
    content: 'O PPVIDA lorem ipsum',
    link: '/',
    image: '',
  },
]
