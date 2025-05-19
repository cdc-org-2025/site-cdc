import Grid from '@mui/material/Grid'
import React from 'react'
import CardTagDesc from '@/components/atoms/CardTagDesc'
import { INoticias } from '@/clients/api/noticias'
import { useRouter } from 'next/navigation'

export default function ListCards({ listNoticias }: { listNoticias: INoticias[] }) {
  const { push } = useRouter()

  const handlePushNoticia = (id: number) => {
    push(`/noticias/${id}`)
  }

  return (
    <Grid container spacing={4}>
      {listNoticias?.map((news) => (
        <Grid key={news.id} item xs={12} md={4} lg={3} xl={3}>
          <CardTagDesc onclick={() => handlePushNoticia(news.id)} info={news} />
        </Grid>
      ))}
    </Grid>
  )
}
