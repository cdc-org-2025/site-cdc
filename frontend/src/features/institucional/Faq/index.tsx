'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'
import AccordionComponent from '@/components/atoms/Accordion'
import AnimationSplitText from '@/components/animations/splitText'
import { useRouter } from 'next/navigation'

export default function Faq() {
  const {
    palette: { primary },
  } = useTheme()
  const { push } = useRouter()

  return (
    <>
      <Box display="flex" flexDirection="column" gap="16px" pb="32px" id="faq">
        <AnimationSplitText>
          <Typography
            variant="h3"
            color="primary"
            textAlign="center"
            width="100%"
          >
            Perguntas frequentes
          </Typography>
        </AnimationSplitText>

        <Typography
          textAlign="center"
          variant="overline"
          textTransform="none"
          color="text.primary"
          lineHeight="150%"
          width="100%"
          sx={{
            '& span': {
              color: primary.main,
              textDecoration: 'underline',
              textTransform: 'none',
              cursor: 'pointer',
            },
          }}
        >
          Não encontrou o que queria? Entre em{' '}
          <Box component="span" onClick={() => push('/contato')}>
            contato
          </Box>{' '}
          com o CDC
        </Typography>
      </Box>
      <AccordionComponent />
    </>
  )
}
