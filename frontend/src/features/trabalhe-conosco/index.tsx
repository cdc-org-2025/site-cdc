'use client'
import { useNavigation } from '@/hooks/useNavigation'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'

export default function TrabalheConoscoPage() {
  const { handleNavigate } = useNavigation()

  const oportunidadeOption = [
    { id: 1, label: 'Assistente de Comunicação', link: '/' },
    { id: 2, label: 'Assistente de Comunicação', link: '/' },
    { id: 3, label: 'Assistente de Limpeza', link: '/' },
  ]

  return (
    <Box width="100%" pt="40px" pb="150px">
      <Typography
        variant="h3"
        lineHeight="150%"
        textAlign="center"
        width="100%"
        color={'primary.dark'}
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
        {oportunidadeOption.length === 0 ? (
          <Typography
            component="a"
            variant="h4"
            fontWeight={500}
            textAlign="center"
          >
            Infelizmente não temos vagas disponíveis no momento.
          </Typography>
        ) : (
          oportunidadeOption.map((item) => (
            <Typography
              onClick={() => handleNavigate(`/trabalhe-conosco/${item.id}`)}
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
              {item.label}
            </Typography>
          ))
        )}
      </Box>
    </Box>
  )
}
