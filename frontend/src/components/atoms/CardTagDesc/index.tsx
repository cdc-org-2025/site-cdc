'use client'
import React, { memo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonTag from '../ButtonTag'
import { storageUrl } from '@/constants/storageDomain'

interface ICardTagDesc {
  info: any
  personal?: boolean
  onclick?: (_?: any) => void
  onclickTag?: (_?: any) => void
}

function CardTagDesc({
  info,
  personal,
  onclick,
  onclickTag,
}: ICardTagDesc) {
  const imageNotFound = 'https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'
  if (personal) {
    return (
      <Box display="flex" flexDirection="column" gap="12px" width="100%">
        <Box
          width="100%"
          height="192px"
          sx={{
            backgroundImage: `url(${storageUrl}/${info.image ?? imageNotFound})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '32px',
            backgroundColor: 'gray',
          }}
        />

        <Box display={'flex'} gap='10px' flexWrap={'wrap'}>
          {info?.areas?.map((area: { id: number, nome: string }) => (
            <ButtonTag key={area.id}>{area.nome}</ButtonTag>
          ))}
        </Box>
        <Box display="flex" flexDirection="column" gap="4px">
          <Typography
            variant="overline"
            lineHeight="150%"
            textTransform="none"
            color="text.primary"
            maxWidth="390px"
          >
            {info.description}
          </Typography>
          {info.occupation && (
            <Typography
              variant="subtitle2"
              lineHeight="150%"
              textTransform="none"
              color="#727271"
            >
              {info.occupation}
            </Typography>
          )}
          {info.email && (
            <Typography
              variant="subtitle2"
              lineHeight="150%"
              textTransform="none"
              color="#727271"
            >
              {info.email}
            </Typography>
          )}
        </Box>
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="12px"
      sx={{
        cursor: 'pointer',
        '&:hover .imgZoom': {
          backgroundSize: '110%',
        },
        '&:hover .descText': {
          color: 'primary.main',
        },
      }}
    >
      <Box
        onClick={onclick}
        height={{
          xs: '260px',
          sm: '173px',
          md: '230px',
          lg: '266px',
        }}
        sx={{
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          className="imgZoom"
          sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${storageUrl}/${info?.imagem_capa ?? imageNotFound})`,
            backgroundColor: 'gray',
            backgroundSize: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'background-size 0.3s ease-in-out',
          }}
        />
      </Box>
      <Box display={'flex'} gap='10px' flexWrap={'wrap'}>
        {info?.areas?.map((area: { id: number, nome: string }) => (
          <ButtonTag noAnimation={true} onClick={onclickTag} key={area.id}>{area.nome}</ButtonTag>
        ))}
      </Box>
      <Box onClick={onclick}>
        <Typography
          className="descText"
          variant="overline"
          lineHeight="150%"
          textTransform="none"
          color="text.primary"
          maxWidth="390px"
        >
          {info?.titulo ?? "Título não informado"}
        </Typography>
      </Box>
    </Box>
  )
}

export default memo(CardTagDesc)
