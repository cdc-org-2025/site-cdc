'use client'
import { FeaturesContext } from '@/context/featuresContext'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React, { useContext, useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import AnimetedSlide from '@/components/animations/slide'

export default function AccordionProjectsMobile() {
  const {
    expandedAccordion,
    accordionProjectsOption,
    handleExpandAccordionImage,
    handleClickView,
  } = useContext(FeaturesContext)

  const {
    palette: { secondary, text },
  } = useTheme()

  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (expandedAccordion.id !== 0 && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    } else {
      setContentHeight(0)
    }
  }, [expandedAccordion])

  return (
    <Box
      px="16px"
      display={{ xs: 'flex', md: 'none' }}
      width="100%"
      gap="16px"
      flexDirection="column"
      mb="40px"
    >
      <AnimetedSlide distance={100} tension={10} friction={5}>
        <Box
          display="flex"
          gap="12px"
          maxWidth="100%"
          overflow="auto"
          sx={{
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {accordionProjectsOption.map((item) => (
            <button
              key={item.id}
              onClick={() => handleExpandAccordionImage(item)}
              style={{
                height: '40px',
                padding: '11px 14px',
                borderRadius: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                gap: '6px',
                backgroundColor:
                  expandedAccordion.id === item.id
                    ? secondary.light
                    : 'transparent',
                border: `1px solid ${secondary.light}`,
              }}
            >
              {expandedAccordion.id === item.id && (
                <CloseIcon fontSize="small" htmlColor="#333" />
              )}
              <Typography
                variant="subtitle2"
                lineHeight="120%"
                color={text.primary}
              >
                {item.title}
              </Typography>
            </button>
          ))}
        </Box>
      </AnimetedSlide>

      <AnimetedSlide distance={100} tension={10} friction={5}>
        <Box
          padding={expandedAccordion.id !== 0 ? '16px' : '0px'}
          bgcolor={'background.paper'}
          borderRadius="32px"
          boxShadow="0px 15px 38.2px 0px #0000001F"
        >
          <Box
            ref={contentRef}
            sx={{
              maxHeight: `${contentHeight}px`,
              overflow: 'hidden',
              transition:
                'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
              opacity: expandedAccordion.id !== 0 ? 1 : 0,
            }}
          >
            {expandedAccordion.id !== 0 && (
              <Box display="flex" flexDirection="column" gap="8px">
                <Typography
                  textTransform="none"
                  color={'text.primary'}
                  variant="overline"
                  lineHeight="150%"
                >
                  {expandedAccordion.description}
                </Typography>
                <Typography
                  textTransform="none"
                  color={'text.primary'}
                  variant="subtitle1"
                  lineHeight="150%"
                >
                  {expandedAccordion.content}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  color="primary"
                  mb="8px"
                >
                  <Button
                    size="small"
                    onClick={() => handleClickView(expandedAccordion?.link)}
                  >
                    <Typography
                      textTransform="none"
                      variant="subtitle1"
                      lineHeight="150%"
                    >
                      Ver mais
                    </Typography>
                    <AddIcon fontSize="small" />
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '480px',
              borderRadius: '32px',
              backgroundColor: '#f3f2ed',
              backgroundImage: `url(${expandedAccordion.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transition: 'background-image 0.5s ease-in-out',
            }}
          />
        </Box>
      </AnimetedSlide>
    </Box>
  )
}
