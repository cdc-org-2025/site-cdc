'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'
import AccordionComponent from '@/components/atoms/Accordion'
import AnimationSplitText from '@/components/animations/splitText'
import { useNavigation } from '../../../hooks/useNavigation'

export default function Faq() {
  const {
    palette: {
      primary: { main },
    },
  } = useTheme()
  const { handleNavigate } = useNavigation()

  return (
    <>
      <Box display="flex" flexDirection="column" gap="16px" pb="32px" id="faq">
        <AnimationSplitText>
          <Typography
            variant="h3"
            color="primary"
            width="100%"
            textAlign={'center'}
          >
            Perguntas frequentes
          </Typography>
        </AnimationSplitText>
        <Typography
          textAlign={'center'}
          variant="overline"
          textTransform="none"
          color="text.primary"
          lineHeight="150%"
          width="100%"
          sx={{
            '& span': {
              color: main,
              textDecoration: 'underline',
              textTransform: 'none',
              cursor: 'pointer',
            },
          }}
        >
          Não encontrou o que queria? Entre em{' '}
          <Box component="span" onClick={() => handleNavigate('/contato')}>
            contato
          </Box>{' '}
          com o CDC
        </Typography>
      </Box>
      <AccordionComponent />
    </>
  )
}
