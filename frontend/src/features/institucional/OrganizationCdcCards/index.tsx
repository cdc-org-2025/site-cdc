import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import DirectorImage from '../../../assets/cards-information/institutional-board.svg'
import CoordinatorImage from '../../../assets/cards-information/institutional-coordinator.svg'
import AssemblyImage from '../../../assets/cards-information/general-assembly.svg'
import AuditImage from '../../../assets/cards-information/audit-committee.svg'
import ProgramImage from '../../../assets/cards-information/program-coordination.svg'
import CardInformation from '@/components/molecules/CardInformation'
import AnimationSplitText from '@/components/animations/splitText'
import AnimetedSlide from '@/components/animations/slide'

export default function OrganizationCdcCards() {
  const cardOptions = [
    {
      image: DirectorImage,
      title: 'Diretoria Institucional',
      description:
        'A direção do Centro de Desenvolvimento e Cidadania lidera a organização, define a visão, toma decisões estratégicas, gerencia recursos, motiva a equipe, mantém relações externas, assegura a transparência e capta recursos, garantindo que o CDC cumpra sua missão com eficácia e responsabilidade.',
      xs: 12,
      md: 6,
      lg: 6,
    },
    {
      image: CoordinatorImage,
      title: 'Coordenação Institucional',
      description:
        'A Coordenação Institucional do CDC transforma estratégias da direção em ações, gerencia operações, facilita a comunicação, monitora o progresso e apoia decisões. Conecta a direção à equipe, assegura a execução eficaz dos projetos, aloca recursos com eficiência, promove o desenvolvimento da equipe e contribui para o cumprimento da missão da organização.',
      xs: 12,
      md: 6,
      lg: 6,
    },
    {
      image: AssemblyImage,
      title: 'Assembleia Geral',
      description:
        'A Assembleia Geral do CDC toma decisões estratégicas, elege diretorias, supervisiona a gestão, define prioridades e promove a prestação de contas. Também delibera sobre questões importantes, aprova mudanças estatutárias e representa os membros. Como instância máxima de governança, garante alinhamento à missão, atendimento às necessidades da comunidade e transparência nas atividades.',
      xs: 12,
      md: 6,
      lg: 4,
    },
    {
      image: AuditImage,
      title: 'Conselho Fiscal',
      description:
        'O Conselho Fiscal do CDC supervisiona as finanças e controla a gestão, revisando contas, orçamentos e realizando auditorias. Elabora relatórios para a Assembleia Geral, emite recomendações estratégicas, garante transparência, conformidade legal e identifica riscos financeiros, assegurando o uso responsável dos recursos e contribuindo para a saúde financeira e integridade da organização.',
      xs: 12,
      md: 6,
      lg: 4,
    },
    {
      image: ProgramImage,
      title: 'Coordenação de Projetos e Programas',
      description:
        'As Coordenações de Projetos e Programas do CDC implementam e avaliam iniciativas, planejam estrategicamente, supervisionam equipes, estabelecem parcerias e monitoram o progresso. Também atuam na defesa de direitos, garantem conformidade legal, promovem conscientização pública e documentam atividades, assegurando o sucesso dos programas e o cumprimento da missão da organização.',
      xs: 12,
      md: 12,
      lg: 4,
    },
  ]

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="16px"
        pt="90px"
        pb="32px"
      >
        <AnimationSplitText>
          <Typography
            variant="h3"
            color="primary"
            textAlign="center"
            width="100%"
            id='organizationCdc'
            fontSize={{ xs: '35px', md: '1.94rem' }}
          >
            Organização do CDC
          </Typography>
        </AnimationSplitText>
        <AnimationSplitText>
          <Typography
            variant="overline"
            textAlign="center"
            textTransform="none"
            color="text.primary"
            lineHeight="150%"
            maxWidth="650px"
          >
            O Centro de Desenvolvimento e Cidadania tem uma estrutura
            estabelecida para garantir confiança e transparência nas decisões
            tomadas pela ONG.
          </Typography>
        </AnimationSplitText>
      </Box>
      <Grid container spacing={2} pb={{ xs: '40px', md: '96px' }}>
        {cardOptions.map((item) => (
          <Grid item key={item.title} xs={item.xs} md={item.md} lg={item.lg}>
            <AnimetedSlide>
              <CardInformation item={item} />
            </AnimetedSlide>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
