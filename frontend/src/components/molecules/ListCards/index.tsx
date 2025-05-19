import Grid from '@mui/material/Grid'
import React from 'react'
import CardTagDesc from '@/components/atoms/CardTagDesc'
import { useRouter } from 'next/navigation'

export default function ListCards({ list, page }: { list: any[], page: string }) {
  const { push } = useRouter()

  const handlePushPage = (id: number) => {
    push(`${page}/${id}`)
  }

  return (
    <Grid container spacing={4}>
      {list?.map((news) => (
        <Grid key={news.id} item xs={12} md={4} lg={3} xl={3}>
          <CardTagDesc onclick={() => handlePushPage(news.id)} info={news} />
        </Grid>
      ))}
    </Grid>
  )
}
