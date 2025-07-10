'use client'
import { useOportunidadesListQuery } from '@/clients/api/oportunidades'
import { useScrollToTop } from '@/hooks/useScroll'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function TrabalheConoscoPage() {
  const { push } = useRouter()
  const { data: listOportunidades } = useOportunidadesListQuery()
  useScrollToTop()

  return (
    <Box width="100%" pt="40px" pb="150px">
      <Typography
        variant="h3"
        lineHeight="150%"
        textAlign="center"
        width="100%"
        color={'primary.main'}
      >
        Oportunidades
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        gap="16px"
        py="20px"
      >
        {listOportunidades?.length === 0 ? (
          <Typography
            component="a"
            variant="h4"
            fontWeight={500}
            textAlign="center"
          >
            Infelizmente não temos vagas disponíveis no momento.
          </Typography>
        ) : (
          listOportunidades?.map((item) => (
            <Typography
              onClick={() => push(`/trabalhe-conosco/${item.id}`)}
              component="a"
              variant="h4"
              key={item.id}
              fontWeight={500}
              textAlign="center"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {item.titulo}
            </Typography>
          ))
        )}
      </Box>
    </Box>
  )
}
