import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

interface ICardInformation {
  item: {
    image?: string | StaticImport
    title?: string
    description?: string
  }
}

export default function CardInformation({ item }: ICardInformation) {
  const { description, image, title } = item
  const { palette: { background } } = useTheme()

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      p="32px"
      bgcolor={background.paper}
      boxShadow=" 0px 15px 38.2px 0px #0000001F"
      borderRadius="32px"
      color="text.primary"
    >
      {image && <Image src={image} alt={`icone-${title}`} />}
      <Typography fontSize={{ xs: '28px', md: '1.94rem' }} textAlign={'center'} pt="24px" variant="h4" fontWeight={500} lineHeight="120%">
        {title}
      </Typography>
      <Typography
        textAlign="center"
        lineHeight="150%"
        textTransform="none"
        pt="16px"
        variant="overline"
      >
        {description}
      </Typography>
    </Box>
  )
}
