import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React from 'react'
import AnimationSplitText from '@/components/animations/splitText'

interface IVacancyDescription {
  description: {
    title: string
    requisitos: string[]
    atribuicoes: string[]
    beneficios: string[]
    cronograma: string[]
    informacoesAdicionais: string[]
  }
}

export default function VacancyDescription({
  description,
}: IVacancyDescription) {
  return (
    <>
      <AnimationSplitText>
        <Typography color="text.primary" lineHeight="150%">
          {description.title}
        </Typography>
      </AnimationSplitText>
      <Box
        pt="32px"
        pb="8px"
        width="100%"
        display="flex"
        flexDirection={'column'}
        gap="16px"
      >
        <AnimationSplitText>
          <Typography
            variant="h4"
            fontWeight={500}
            lineHeight={'120%'}
            color="secondary.dark"
          >
            Requisitos
          </Typography>
        </AnimationSplitText>
        <Box width="100%" display="flex" flexDirection={'column'} gap="16px">
          {description.requisitos.map((req) => (
            <AnimationSplitText key={req}>
              <Typography lineHeight={'150%'} color="secondary.dark">
                {req}
              </Typography>
            </AnimationSplitText>
          ))}
        </Box>
      </Box>
      <Box
        py="8px"
        width="100%"
        display="flex"
        flexDirection={'column'}
        gap="16px"
      >
        <AnimationSplitText>
          <Typography
            variant="h4"
            fontWeight={500}
            lineHeight={'120%'}
            color="secondary.dark"
          >
            Atribuições
          </Typography>
        </AnimationSplitText>

        <Box width="100%" display="flex" flexDirection={'column'} gap="16px">
          {description.atribuicoes.map((att) => (
            <AnimationSplitText key={att}>
              <Typography lineHeight={'150%'} color="secondary.dark">
                {att}
              </Typography>
            </AnimationSplitText>
          ))}
        </Box>
      </Box>
      <Box
        py="8px"
        width="100%"
        display="flex"
        flexDirection={'column'}
        gap="16px"
      >
        <AnimationSplitText>
          <Typography
            variant="h4"
            fontWeight={500}
            lineHeight={'120%'}
            color="secondary.dark"
          >
            Benefícios
          </Typography>
        </AnimationSplitText>

        <Box width="100%" display="flex" flexDirection={'column'} gap="16px">
          {description.beneficios.map((ben) => (
            <AnimationSplitText key={ben}>
              <Typography lineHeight={'150%'} color="secondary.dark">
                {ben}
              </Typography>
            </AnimationSplitText>
          ))}
        </Box>
      </Box>
      <Box
        py="8px"
        width="100%"
        display="flex"
        flexDirection={'column'}
        gap="16px"
      >
        <AnimationSplitText>
          <Typography
            variant="h4"
            fontWeight={500}
            lineHeight={'120%'}
            color="secondary.dark"
          >
            Cronograma
          </Typography>
        </AnimationSplitText>
        <Box width="100%" display="flex" flexDirection={'column'} gap="16px">
          {description.cronograma.map((cro) => (
            <AnimationSplitText key={cro}>
              <Typography lineHeight={'150%'} color="secondary.dark">
                {cro}
              </Typography>
            </AnimationSplitText>
          ))}
        </Box>
      </Box>
      <Box
        pt="8px"
        pb="24px"
        width="100%"
        display="flex"
        flexDirection={'column'}
      >
        <AnimationSplitText>
          <Typography lineHeight={'150%'} color="secondary.dark">
            Informações Adicionais:
          </Typography>
        </AnimationSplitText>
        <Box width="100%" display="flex" flexDirection={'column'} gap="16px">
          {description.informacoesAdicionais.map((info) => (
            <AnimationSplitText key={info}>
              <Typography lineHeight={'150%'} color="secondary.dark">
                {info}
              </Typography>
            </AnimationSplitText>
          ))}
        </Box>
      </Box>
      <AnimationSplitText>
        <Typography lineHeight={'150%'} color="secondary.dark">
          A [Nome da Organização] é uma instituição comprometida com a
          diversidade e a inclusão, incentivando a participação de todos os
          perfis em seu processo seletivo.
        </Typography>
      </AnimationSplitText>
    </>
  )
}
