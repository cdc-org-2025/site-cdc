'use client'

import "./globals.css";
import { useContext } from "react";
import { SettingsContext } from "@/context/settingsContext";
import { ContextProviders } from "@/context";
import { ThemeProvider } from "@mui/material";
import getTheme from "@/theme";
import 'react-toastify/dist/ReactToastify.css';
import ButtonAccessible from "@/components/atoms/ButtonAccessible";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContextProviders>
      <InnerRootLayout >{children}</InnerRootLayout>
    </ContextProviders>
  );
}

function InnerRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    theme,
    fontScale,
    fontWeightScale,
    grayscale,
    highContrast,
    negativeContrast,
  } = useContext(SettingsContext)

  const getAccessibilityFilter = () => {
    if (grayscale) return 'grayscale(1)'
    if (highContrast) return 'contrast(2)'
    if (negativeContrast) return 'invert(1) contrast(1.5)'
    return 'none'
  }

  return (
    <ThemeProvider theme={getTheme(theme, fontScale, fontWeightScale)}>
      <html lang={"pt-BR"}>
        <body>
          <ButtonAccessible />
          <div id="app-content" style={{ filter: getAccessibilityFilter(), transition: 'filter 0.3s ease' }}>
            {children}
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
