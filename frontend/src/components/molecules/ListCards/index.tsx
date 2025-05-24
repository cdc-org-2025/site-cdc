import Grid from '@mui/material/Grid'
import React from 'react'
import CardTagDesc from '@/components/atoms/CardTagDesc'
import { useRouter } from 'next/navigation'
import ZoomOutOnView from '@/components/animations/zoomOutOnView'
import VectorRoundedLines from '@/components/atoms/VectorRoundedLines'

export default function ListCards({ list, page }: { list: any[], page: string }) {
  const { push } = useRouter()

  const handlePushPage = (id: number, documento_url: string) => {
    if (page === "/noticias" || page === "/programas") {
      push(`${page}/${id}`)
    } else {
      window.open(documento_url, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <Grid container spacing={4}>
      <VectorRoundedLines zIndex={0} margin='250px 0 0 0' />
      {list?.map((news) => (
        <Grid key={news.id} item xs={12} md={4} lg={4} xl={4}>
          <ZoomOutOnView>
            <CardTagDesc onclick={() => handlePushPage(news.id, news.documento_url)} info={news} />
          </ZoomOutOnView>
        </Grid>
      ))}
    </Grid>
  )
}
