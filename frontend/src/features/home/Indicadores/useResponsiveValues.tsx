import { useWindowDimensions } from "@/hooks/useDimensions";

export const useResponsiveValues = () => {
  const { width, height } = useWindowDimensions();

  const breakpoints = [
    { name: "iPad", match: width === 1024 && height === 768, gap: "600px", padding: "510px" },
    { name: "Laptop", match: width === 1440 && height === 900, gap: "740px", padding: "630px" },
    { name: "iPhone11", match: width === 414 && height === 896, gap: "640px", padding: "400px" },
    { name: "iPhone11OpenUrl", match: width === 414 && height === 719, gap: "460px", padding: "230px" },
    { name: "monitor14", match: width === 1366 && height === 600, gap: "430px", padding: "350px" },
    { name: "adapter", match: width === 1920 && height === 950, gap: "780px", padding: "690px" },

    { name: "androidPequeno", match: width <= 360 && height <= 640, gap: "400px", padding: "230px" },
    { name: "mobilePequeno", match: width <= 375 && height <= 667, gap: "420px", padding: "270px" },
    { name: "mobileMedio", match: width <= 390 && height <= 844, gap: "590px", padding: "460px" },
    { name: "mobileGrande", match: width <= 430 && height <= 932, gap: "680px", padding: "540px" },

    { name: "tabletPequeno", match: width <= 768 && height <= 1024, gap: "730px", padding: "730px" },
    { name: "tabletMedio", match: width <= 834 && height <= 1194, gap: "1040px", padding: "890px" },
    { name: "tabletGrande", match: width <= 1024 && height <= 1366, gap: "1250px", padding: "1000px" },

    { name: "notebookPequeno", match: width <= 1366 && height <= 768, gap: "610px", padding: "490px" },
    { name: "notebookMedio", match: width <= 1600 && height <= 900, gap: "750px", padding: "600px" },
    { name: "notebookGrande", match: width <= 1920 && height <= 1080, gap: "920px", padding: "800px" },

    { name: "desktopMedio", match: width <= 2560 && height <= 1440, gap: "1300px", padding: "1120px" },
    { name: "desktopGrande", match: width <= 3440 && height <= 1440, gap: "1008px", padding: "720px" },
    { name: "desktopUltra", match: width >= 3840 && height >= 2160, gap: "1512px", padding: "1080px" },
  ];

  const getValue = (type: "gap" | "padding") => {
    const found = breakpoints.find(bp => bp.match);
    return found ? found[type] : (type === "gap" ? "1512px" : "1080px");
  };

  return {
    gapCards: () => getValue("gap"),
    paddingBottom: () => getValue("padding"),
  };
};
