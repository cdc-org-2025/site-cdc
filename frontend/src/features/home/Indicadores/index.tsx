import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useIndicadoresQuery } from '@/clients/api/indicadores'
import { useBannerQuery } from '@/clients/api/banners'
import { storageUrl } from '@/constants/storageDomain'

export default function Indicadores() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [_, setShowFixedText] = useState(false)
  const { data } = useIndicadoresQuery()
  const { data: bannerData } = useBannerQuery("indicadores")

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const offsetStart = windowHeight * 0.3
      const offsetEnd = windowHeight * 0.1

      const startReached = rect.top <= windowHeight - offsetStart
      const endReached = rect.bottom <= windowHeight - offsetEnd

      setShowFixedText(startReached && !endReached)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      ref={sectionRef}
      sx={{
        backgroundColor: '#afafaf',
        backgroundImage: `url(${storageUrl}/${bannerData?.[0].url_img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        height: 'calc(300vh - 94px)',
        position: 'relative',
        borderRadius: '32px',
      }}
    >
      <Box width="100%" height={"120px"} />
      <Box
        sx={{
          position: 'sticky',
          top: '200px',
          zIndex: 2,
          marginLeft: { xs: '16px', sm: "16px", md: "16px", lg: "90px" },
          maxWidth: { xs: '157px', sm: "157px", md: "300px", lg: "445px" },
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography
          sx={{
            typography: { xs: 'h4', sm: "h4", md: 'h3', lg: "h3" },
            color: '#f6f6f6',
            textAlign: 'left',
            paddingBottom: "500px",
            fontSize: "32px"
          }}
          textTransform="none"
        >
          {bannerData?.[0]?.titulo ?? "Através dos seus programas, o CDC impactou e continua "}
          <Typography
            component="span"
            sx={{
              typography: { xs: 'h4', sm: "h4", md: 'h3', lg: "h3" },
              color: 'secondary.light',
            }}
            textTransform="none"
          >
            {bannerData?.[0]?.subtitulo ?? "impactando milhares de vidas"}
          </Typography>
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'sticky',
          top: '200px',
          zIndex: 3,
          display: "flex",
          right: 0,
          width: "100%",
          justifyContent: "flex-end",
          marginTop: "-660px"
        }}
      >
        <Box
          pr={{ xs: '20px', sm: "20px", md: "44px", lg: "80px" }}
          maxWidth={{ xs: '200px', sm: "200px", md: "500px", lg: "500px" }}
          width="100%"
          display={"flex"}
          flexDirection={"column"}
          gap="70vh"
        >
          {data?.map((item) => (
            <Box
              key={item.id}
              p="16px"
              width="100%"
              minHeight="200px"
              bgcolor="background.paper"
              borderRadius="32px"
              maxWidth={{ xs: '100%', sm: '500px' }}
              minWidth={{ xs: '148px', sm: '200px' }}
            >
              <Typography variant="h1" color="primary" pb="8px">
                {item.quantidade}
              </Typography>
              <Typography
                variant="overline"
                color="text.primary"
                textTransform="none"
                lineHeight={"150%"}
              >
                {item.descricao}
              </Typography>
            </Box>
          ))}
          <Box width="100%" height={"10px"} />
        </Box>
      </Box>
    </Box>
  )
}
