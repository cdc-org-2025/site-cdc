'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'
import AccordionComponent from '@/components/atoms/Accordion'
import AnimationSplitText from '@/components/animations/splitText'
import { useRouter } from 'next/navigation'
import { IPerguntas } from '@/clients/api/perguntas'
import { useConteudoSecaoQuery } from '@/clients/api/conteudo-secao'

export default function Faq({ listPerguntas }: { listPerguntas?: IPerguntas[] }) {
  const {
    palette: { primary },
  } = useTheme()
  const { push } = useRouter()
  const { data } = useConteudoSecaoQuery("perguntas_frequentes")

  return (
    <>
      {listPerguntas && data && (
        <Box display="flex" flexDirection="column" gap="16px" pb="32px" id="faq">
          <AnimationSplitText threshold={0.8}>
            <Typography
              variant="h3"
              color="primary"
              textAlign="center"
              width="100%"
            >
              {data[0].titulo ?? "Perguntas frequentes"}
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
            {data[0].resumo
              ??
              <>
                Não encontrou o que queria? Entre em{' '}
                <Box component="span" onClick={() => push('/contato')}>
                  contato
                </Box>{' '}
                com o CDC
              </>
            }
          </Typography>
        </Box>
      )}
      <AccordionComponent listaPerguntas={listPerguntas} />
    </>
  )
}
