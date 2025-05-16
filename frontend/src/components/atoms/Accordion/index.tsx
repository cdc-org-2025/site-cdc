'use client'

import { memo } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'
import { usePerguntasQuery } from '@/clients/api/perguntas'

const AccordionComponent = () => {
  const { data } = usePerguntasQuery()

  return (
    <>
      {data?.map((item, index) => (
        <div key={item.id}>
          <Accordion
            disableGutters
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              border: 'none',
              '&::before': {
                content: '""',
                height: 0,
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-content-${item.id}`}
              id={`panel-header-${item.id}`}
            >
              <Typography color='#000' component="span" fontWeight={400}>
                {item.pergunta}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pb: 4 }}>
              <Typography color='#000' component="span" fontWeight={400} lineHeight="150%">
                {item.resposta}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {index < data.length - 1 && <Divider />}
        </div>
      ))}
    </>
  )
}

export default memo(AccordionComponent)
