"use client";

import { useBannerQuery } from "@/clients/api/banners";
import { useIndicadoresQuery } from "@/clients/api/indicadores";
import { storageUrl } from "@/constants/storageDomain";
import { useWindowDimensions } from "@/hooks/useDimensions";
import { sanitizeHtml } from "@/utils/stripHtmlTags";
import { Box, Typography } from "@mui/material";

export default function BannerFixedBackground() {
  // esse componente contém uma má prática inimaginavél, se for fazer scroll-jacking, crie outro componente, melhor que editar esse.
  const { data: bannerData } = useBannerQuery("indicadores");
  const { data } = useIndicadoresQuery();
  const { width, height } = useWindowDimensions();

  const androidPequeno = width <= 360 && height <= 640;
  const mobilePequeno = width <= 375 && height <= 667;
  const mobileMedio = width <= 390 && height <= 844;
  const mobileGrande = width <= 430 && height <= 932;

  const tabletPequeno = width <= 768 && height <= 1024;
  const tabletMedio = width <= 834 && height <= 1194;
  const tabletGrande = width <= 1024 && height <= 1366;

  const iPad = width === 1024 && height === 768;
  const Laptop = width === 1440 && height === 900;
  const iPhone11 = width === 414 && height === 896;

  const notebookPequeno = width <= 1366 && height <= 768;
  const notebookMedio = width <= 1600 && height <= 900;
  const notebookGrande = width <= 1920 && height <= 1080;

  const desktopMedio = width <= 2560 && height <= 1440;
  const desktopGrande = width <= 3440 && height <= 1440;
  const desktopUltra = width >= 3840 && height >= 2160;

  const gapCards = () => {
    if (iPad) return "600px"
    if (Laptop) return "740px"
    if (iPhone11) return "640px"

    if (androidPequeno) return "400px";
    if (mobilePequeno) return "420px";
    if (mobileMedio) return "590px";
    if (mobileGrande) return "680px";

    if (tabletPequeno) return "730px";
    if (tabletMedio) return "1040px";
    if (tabletGrande) return "1250px";

    if (notebookPequeno) return "610px";
    if (notebookMedio) return "750px";
    if (notebookGrande) return "920px";

    if (desktopMedio) return "1300px";
    if (desktopGrande) return "1008px";
    if (desktopUltra) return "1512px";

    return "1512px"; // fallback
  };

  const paddingBottom = () => {
    if (iPad) return "510px"
    if (Laptop) return "630px"
    if (iPhone11) return "400px"

    if (androidPequeno) return "230px";
    if (mobilePequeno) return "270px";
    if (mobileMedio) return "460px";
    if (mobileGrande) return "540px";

    if (tabletPequeno) return "730px";
    if (tabletMedio) return "890px";
    if (tabletGrande) return "1000px";

    if (notebookPequeno) return "490px";
    if (notebookMedio) return "600px";
    if (notebookGrande) return "800px";

    if (desktopMedio) return "1120px";
    if (desktopGrande) return "720px";
    if (desktopUltra) return "1080px";

    return "1080px"; // fallback
  };

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
