import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React, { useEffect, useRef, useState } from 'react'
import { useIndicadoresQuery } from '@/clients/api/indicadores'
import { useBannerQuery } from '@/clients/api/banners'
import { storageUrl } from '@/constants/storageDomain'
import { sanitizeHtml } from '@/utils/stripHtmlTags'

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
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        height: 'calc(300vh - 94px)',
        position: 'relative',
        borderRadius: '32px',
        backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url("${storageUrl}/${bannerData?.[0].url_img}")
      `,
      }}
    >
      <Box width="100%" height={"120px"} />
      <Box
        sx={{
          position: 'sticky',
          top: '200px',
          zIndex: 2,
          marginLeft: { xs: '16px', sm: "16px", md: "16px", lg: "90px" },
          maxWidth: { xs: '157px', sm: "430px", md: "430px", lg: "445px" },
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography
          sx={{
            typography: { xs: 'h4', sm: 'h4', md: 'h3', lg: 'h3' },
            color: '#f6f6f6',
            textAlign: 'left',
            marginBottom: '500px',
            fontSize: '32px',
            borderRadius: '20px',
          }}
          textTransform="none"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(bannerData?.[0]?.titulo ?? "Sem título de teste 1 2 3 4 5") }}
        />
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
          maxWidth={{ xs: '200px', sm: "40vw", md: "470px", lg: "500px" }}
          width="100%"
          display={"flex"}
          flexDirection={"column"}
          gap="70vh"
          mr={{ xs: '0px', sm: "44px", md: "44px", lg: "80px" }}
          maxHeight={"2550px"}
          mt={{ xs: '-110px', sm: "0px", md: "0px", lg: "0px" }}
        >
          {data?.map((item, index) => (
            <Box
              key={item.id}
              p="16px"
              width="100%"
              minHeight="200px"
              bgcolor="background.paper"
              borderRadius="32px"
              maxWidth={{ xs: '100%', sm: '500px' }}
              minWidth={{ xs: '148px', sm: '200px' }}
              mt={{ xs: index === 2 ? "60px" : "0px", sm: index === 2 ? "180px" : "0px" }}
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
