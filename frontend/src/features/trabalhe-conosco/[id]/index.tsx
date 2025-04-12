'use client'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import React from 'react'
import PPDI from '../../../assets/banner/ppdi.svg'
import { useParams } from 'next/navigation'
import VacancyDescription from './vacancyDescription'
import Box from '@mui/material/Box'
import FormEnrollment from './formEnrollment'

const mockVaga = {
  title:
    'O Centro de Desenvolvimento e Cidadania torna pública a abertura de processo seletivo para a contratação de um(a) Assistente de Comunicação, com o objetivo de fortalecer suas estratégias de comunicação e ampliar o impacto de suas ações.',
  requisitos: [
    'Graduação em Comunicação Social, Jornalismo, Publicidade e Propaganda, Marketing ou áreas afins.',
    'Experiência prévia em atividades relacionadas à comunicação, como produção de conteúdo, gestão de redes sociais, assessoria de imprensa ou design gráfico.',
    'Conhecimento em ferramentas de edição de texto, imagem e vídeo(ex.: Adobe Creative Cloud, Canva, etc.).',
    'Habilidades em gestão de mídias sociais e métricas de engajamento.',
    'Boa capacidade de escrita, organização e trabalho em equipe.',
  ],
  atribuicoes: [
    'Produzir e revisar conteúdos para redes sociais, site, newsletters e materiais institucionais.',
    'Auxiliar na gestão das mídias sociais, incluindo planejamento de posts, monitoramento de métricas e interação com o público.',
    'Apoiar a criação de campanhas de comunicação e divulgação de projetos.',
    'Colaborar com a produção de materiais gráficos e audiovisuais.',
    'Atuar em conjunto com a equipe para alinhar as estratégias de comunicação aos objetivos institucionais.',
  ],
  beneficios: [
    'Contratação sob regime [CLT/PJ/estágio/etc.]',
    'Remuneração compatível com o mercado.',
    '[Incluir outros benefícios, como vale-transporte, vale-refeição, plano de saúde, etc.].',
  ],
  cronograma: [
    'Inscrições: De [data] a [data], através do e-mail [e-mail] com o assunto “Seleção Assistente de Comunicação”. Enviar currículo atualizado e portfólio (se aplicável).',
    'Etapas: Análise de currículo, entrevista e teste prático (conforme necessário).',
    'Resultado: Divulgação dos selecionados até [data] no site [site da organização] ou por e-mail.',
  ],
  informacoesAdicionais: [
    'Para mais detalhes, entrar em contato através do e-mail [e-mail] ou telefone [telefone].',
  ],
}

export default function TrabalheConoscoVagaPage() {
  const { id } = useParams()

  const Banner = {
    id: Number(id),
    title: 'Assistente de Comunicação',
    image: PPDI,
  }
  return (
    <>
      <HeaderBannerUnique Banner={Banner} />
      <Box
        width="100%"
        px="16px"
        pt={{ lg: '60px', md: '40px', xs: '16px' }}
        display="flex"
        flexDirection={'column'}
        alignItems="center"
      >
        <Box maxWidth="802px">
          <VacancyDescription description={mockVaga} />
          <FormEnrollment />
        </Box>
      </Box>
    </>
  )
}
