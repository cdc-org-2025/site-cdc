"use client";

import { useBannerQuery } from "@/clients/api/banners";
import { useIndicadoresQuery } from "@/clients/api/indicadores";
import { storageUrl } from "@/constants/storageDomain";
import { sanitizeHtml } from "@/utils/stripHtmlTags";
import { Box, Typography } from "@mui/material";
import { useResponsiveValues } from "./useResponsiveValues";

export default function BannerFixedBackground() {
  const { data: bannerData } = useBannerQuery("indicadores");
  const { data } = useIndicadoresQuery();
  // esse componente contém uma má prática inimaginavél com breakpoints devido ao tempo para resolver a demanda
  // se for fazer scroll-jacking, crie outro componente não perca tempo refatorando este, o hook abaixo serve 
  // para adicionar breakpoints que ainda não foram cobertos.
  const { gapCards, paddingBottom } = useResponsiveValues();

  return (
    <Box
      sx={{
        height: "calc(300vh - 94px)",
        width: "100%",
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
          position: "sticky",
          top: "150px",
          marginLeft: { xs: "16px", sm: "16px", md: "16px", lg: "90px" },
          maxWidth: { xs: "157px", sm: "430px", md: "430px", lg: "445px" },
          paddingTop: "100px",
          zIndex: 1,
        }}
        paddingBottom={paddingBottom()}
      >
        <Typography
          sx={{
            typography: { xs: "h4", sm: "h4", md: "h3", lg: "h3" },
            color: "#f6f6f6",
            textAlign: "left",
            fontSize: "32px",
          }}
          textTransform="none"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(
              bannerData?.[0]?.titulo ?? "Sem título de teste"
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "120px",
          marginRight: { xs: "16px", sm: "16px", md: "16px", lg: "90px" },
          right: 0,
          maxWidth: { xs: "157px", sm: "430px", md: "430px", lg: "445px" },
          zIndex: 2,
        }}
      >
        <Box
          maxWidth={{ xs: "200px", sm: "40vw", md: "470px", lg: "500px" }}
          width="100%"
          display={"flex"}
          flexDirection={"column"}
          gap={gapCards()}
          mr={{ xs: "0px", sm: "44px", md: "44px", lg: "80px" }}
          justifyContent={"space-between"}
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
              marginTop={{
                xs: index === 2 ? "0px" : "",
                sm: index === 2 ? "100px" : "",
                md: index === 2 ? "-180px" : "",
              }}
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
    </Box>
  );
}
