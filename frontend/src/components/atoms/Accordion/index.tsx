import { Fragment } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'

const listFaqs = [
  {
    id: 0,
    title: 'Pergunta frequente 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In erat erat, iaculis nec ex at, accumsan auctor risus. Aliquam urna dui, iaculis nec dictum eu, lobortis maximus mauris. Donec vehicula viverra nulla, vitae tincidunt mauris varius nec. Praesent sapien libero, convallis nec placerat ac, rhoncus rhoncus metus. Curabitur elementum nisl fringilla dolor dapibus condimentum. Sed eu mollis nisl, at maximus ligula. ',
  },
  {
    id: 1,
    title: 'Pergunta frequente 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In erat erat, iaculis nec ex at, accumsan auctor risus. Aliquam urna dui, iaculis nec dictum eu, lobortis maximus mauris. Donec vehicula viverra nulla, vitae tincidunt mauris varius nec. Praesent sapien libero, convallis nec placerat ac, rhoncus rhoncus metus. Curabitur elementum nisl fringilla dolor dapibus condimentum. Sed eu mollis nisl, at maximus ligula. ',
  },
  {
    id: 2,
    title: 'Pergunta frequente 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In erat erat, iaculis nec ex at, accumsan auctor risus. Aliquam urna dui, iaculis nec dictum eu, lobortis maximus mauris. Donec vehicula viverra nulla, vitae tincidunt mauris varius nec. Praesent sapien libero, convallis nec placerat ac, rhoncus rhoncus metus. Curabitur elementum nisl fringilla dolor dapibus condimentum. Sed eu mollis nisl, at maximus ligula. ',
  },
  {
    id: 3,
    title: 'Pergunta frequente 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In erat erat, iaculis nec ex at, accumsan auctor risus. Aliquam urna dui, iaculis nec dictum eu, lobortis maximus mauris. Donec vehicula viverra nulla, vitae tincidunt mauris varius nec. Praesent sapien libero, convallis nec placerat ac, rhoncus rhoncus metus. Curabitur elementum nisl fringilla dolor dapibus condimentum. Sed eu mollis nisl, at maximus ligula. ',
  },
  {
    id: 4,
    title: 'Pergunta frequente 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In erat erat, iaculis nec ex at, accumsan auctor risus. Aliquam urna dui, iaculis nec dictum eu, lobortis maximus mauris. Donec vehicula viverra nulla, vitae tincidunt mauris varius nec. Praesent sapien libero, convallis nec placerat ac, rhoncus rhoncus metus. Curabitur elementum nisl fringilla dolor dapibus condimentum. Sed eu mollis nisl, at maximus ligula. ',
  },
]

export default function AccordionComponent() {
  return listFaqs.map((item, index) => (
    <Fragment key={item.id}>
      <Accordion
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          border: 'none',
          '&::before': {
            content: '""',
            height: '0',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id={`panel-header-${item.id}`}
        >
          <Typography component="span" fontWeight={400}>
            {item.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingBottom: '32px' }}>
          <Typography component="span" fontWeight={400} lineHeight={'150%'}>
            {item.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      {listFaqs.length !== index + 1 && <Divider />}
    </Fragment>
  ))
}
