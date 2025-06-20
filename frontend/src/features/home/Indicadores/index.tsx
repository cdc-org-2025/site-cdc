"use client";
import { useBannerQuery } from "@/clients/api/banners";
import { useIndicadoresQuery } from "@/clients/api/indicadores";
import { storageUrl } from "@/constants/storageDomain";
import { sanitizeHtml } from "@/utils/stripHtmlTags";
import { Box, Typography } from "@mui/material";
import { Lato } from 'next/font/google'

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
})

export default function BannerFixedBackground() {
  const { data: bannerData } = useBannerQuery("indicadores");
  const { data } = useIndicadoresQuery();

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
          url("${storageUrl}/${bannerData?.[0]?.url_img}")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
    >
      <Box
        sx={{
          marginLeft: { xs: "16px", sm: "16px", md: "16px", lg: "90px" },
          maxWidth: { xs: "157px", sm: "430px", md: "430px", lg: "445px" },
          height: "100vh",
          position: "sticky",
          top: 0,
          display: "flex",
          pt: "88px"
        }}
      >
        <Box
          sx={{
            fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif !important`,
            textAlign: 'left',
            '& h1': {
              lineHeight: 1.2,
              fontWeight: 700,
              letterSpacing: '0px',
              verticalAlign: 'middle',
              // 🔥 Força sobrescrever inline
              '&[style]': {
                fontSize: { xs: '28px !important', sm: '30px !important', md: '38px !important', lg: '48px !important' },
              },
            },
          }}
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(
              bannerData?.[0]?.titulo ?? "Sem título de teste"
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          marginRight: { xs: "0px", sm: "16px", md: "16px", lg: "90px" },
          maxWidth: { xs: "157px", sm: "430px", md: "430px", lg: "445px" },
          zIndex: 2,
          paddingTop: "100px"
        }}
      >
        <Box
          maxWidth={{ xs: "200px", sm: "40vw", md: "470px", lg: "500px" }}
          width="100%"
          display={"flex"}
          flexDirection={"column"}
          mr={{ xs: "0px", sm: "44px", md: "44px", lg: "80px" }}
          justifyContent={"space-between"}
          gap="calc(78vh - 94px)"
        >
          {data?.map((item, index) => (
            <Box
              key={item.id}
              p="16px"
              width="100%"
              minHeight="200px"
              bgcolor="background.paper"
              borderRadius="32px"
              maxWidth={{ xs: "100%", sm: "500px" }}
              minWidth={{ xs: "148px", sm: "200px" }}
              marginBottom={index === 2 ? "calc(78vh - 94px)" : ""}
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
        </Box>
      </Box>
    </div>
  );
}
