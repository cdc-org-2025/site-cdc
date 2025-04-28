'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import ButtonTag from '../ButtonTag'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { memo } from 'react'

interface ICardTagDesc {
  info: {
    id: number
    tag: string
    description: string
    image: string | StaticImport | any
    occupation?: string
    email?: string
  }
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
  if (personal) {
    return (
      <Box display="flex" flexDirection="column" gap="12px" width="100%">
        <Box
          width="100%"
          height="192px"
          sx={{
            backgroundImage: `url(${info.image.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '32px',
          }}
        />
        <Box>
          <ButtonTag>{info.tag}</ButtonTag>
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
      minWidth="260px"
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
        sx={{
          width: '100%',
          height: 260,
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
            backgroundImage: `url(${info.image.src})`,
            backgroundSize: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'background-size 0.3s ease-in-out',
          }}
        />
      </Box>

      <Box>
        <ButtonTag onClick={onclickTag}>{info.tag}</ButtonTag>
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
          {info.description}
        </Typography>
      </Box>
    </Box>
  )
}

export default memo(CardTagDesc)
