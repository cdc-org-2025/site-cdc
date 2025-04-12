'use client'
import AnimatedContent from '@/components/animations/slide/AnimatedContent'
import AnimationSplitText from '@/components/animations/splitText'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'

export default function Doacoes() {
  return (
    <Box
      width="100%"
      p={{ xs: '40px 11px 100px 11px', md: '40px 16px 100px 16px' }}
      display="flex"
      flexDirection="column"
      alignItems={'center'}
      gap="16px"
    >
      <AnimationSplitText>
        <Typography
          variant="h3"
          color={'primary'}
          textAlign={'center'}
          lineHeight={'120%'}
        >
          O Centro de Desenvolvimento e Cidadania precisa de você!
        </Typography>
      </AnimationSplitText>
      <AnimationSplitText>
        <Typography
          variant="overline"
          textTransform="none"
          color={'text.primary'}
          textAlign={'center'}
          lineHeight={'120%'}
          maxWidth="900px"
        >
          O CDC continua ativo graças ao apoio de pessoas como você. Apoie com
          qualquer valor e suporte a luta pela democracia e cidadania.
        </Typography>
      </AnimationSplitText>

      <Box
        p="32px"
        display="flex"
        flexDirection="column"
        alignItems={'center'}
        bgcolor="#FFF5E699"
        gap="24px"
        width="100%"
        maxWidth={'800px'}
      >
        <AnimatedContent reverse>
          <Typography
            variant="h4"
            color={'text.primary'}
            textAlign={'center'}
            lineHeight={'120%'}
          >
            Chave PIX aqui
          </Typography>
        </AnimatedContent>
      </Box>
    </Box>
  )
}
