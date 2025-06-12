'use client'

import Box from '@mui/material/Box'
import Timeline from './TimeLine'
import OrganizationCdcCards from './OrganizationCdcCards'
import Leadership from './Leadership'
import Transparency from './Transparency'
import Faq from './Faq'
import VectorRoundedLines from '@/components/atoms/VectorRoundedLines'
import { Suspense } from 'react'
import SearchScrollHandler from './SearchScrollHandler'
import { useTimeLineQuery } from '@/clients/api/linha-tempo'
import { useCardsInformativosListQuery } from '@/clients/api/cards-informativos'
import { useLiderancasListQuery } from '@/clients/api/liderancas'
import { useListTransparenciaQuery } from '@/clients/api/transparencia'
import { usePerguntasQuery } from '@/clients/api/perguntas'
import { useConteudoSecaoQuery } from '@/clients/api/conteudo-secao'

export default function InstitucionalPage() {
  const { data: listTimeLine } = useTimeLineQuery()
  const { data: listCards } = useCardsInformativosListQuery()
  const { data: listLiderancas } = useLiderancasListQuery()
  const { data: listTransparencia } = useListTransparenciaQuery()
  const { data: listPerguntas } = usePerguntasQuery()
  const { data: organizationSectionInfo } = useConteudoSecaoQuery("organizacao")
  const { data: leadershipSectionInfo } = useConteudoSecaoQuery("liderancas")
  const { data: transparencySectionInfo } = useConteudoSecaoQuery("transparencia")

  return (
    <Suspense fallback={null}>
      {listTimeLine &&
        listCards &&
        listLiderancas &&
        listTransparencia &&
        listPerguntas &&
        organizationSectionInfo &&
        leadershipSectionInfo &&
        transparencySectionInfo && (
          <SearchScrollHandler />
        )}
      <Box
        width="100%"
        p={{
          xs: '40px 16px',
          md: '40px 16px 160px 16px',
          lg: '32px 32px 160px 32px',
        }}
        position="relative"
      >
        <VectorRoundedLines left={0} margin="400px 0px 0px 0px" />
        <VectorRoundedLines rotate={true} right={0} margin="1200px 0px 0px 0px" />
        <Timeline listTimeLine={listTimeLine} />
        <OrganizationCdcCards sectionInfo={organizationSectionInfo?.[0]} listCards={listCards} />
        <Leadership sectionInfo={leadershipSectionInfo?.[0]} listLiderancas={listLiderancas} />
        <Transparency sectionInfo={transparencySectionInfo?.[0]} listTransparencia={listTransparencia} />
        <Faq listPerguntas={listPerguntas} />
      </Box>
    </Suspense>

  )
}
