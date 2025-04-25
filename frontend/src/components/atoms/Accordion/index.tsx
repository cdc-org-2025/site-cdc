'use client'

import { memo, useMemo } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'

const AccordionComponent = () => {
  const listFaqs = useMemo(() => [
    {
      id: 0,
      title: 'Pergunta frequente 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In erat erat, iaculis nec ex at, accumsan auctor risus. Aliquam urna dui, iaculis nec dictum eu, lobortis maximus mauris. Donec vehicula viverra nulla, vitae tincidunt mauris varius nec. Praesent sapien libero, convallis nec placerat ac, rhoncus rhoncus metus. Curabitur elementum nisl fringilla dolor dapibus condimentum. Sed eu mollis nisl, at maximus ligula.',
    },
    {
      id: 1,
      title: 'Pergunta frequente 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In erat erat, iaculis nec ex at, accumsan auctor risus...',
    },
    {
      id: 2,
      title: 'Pergunta frequente 3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In erat erat, iaculis nec ex at, accumsan auctor risus...',
    },
    {
      id: 3,
      title: 'Pergunta frequente 4',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In erat erat, iaculis nec ex at, accumsan auctor risus...',
    },
    {
      id: 4,
      title: 'Pergunta frequente 5',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In erat erat, iaculis nec ex at, accumsan auctor risus...',
    },
  ], [])

  return (
    <>
      {listFaqs.map((item, index) => (
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
              <Typography component="span" fontWeight={400}>
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pb: 4 }}>
              <Typography component="span" fontWeight={400} lineHeight="150%">
                {item.description}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {index < listFaqs.length - 1 && <Divider />}
        </div>
      ))}
    </>
  )
}

export default memo(AccordionComponent)
