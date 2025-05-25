'use client'

import "./globals.css";
import { useContext } from "react";
import { SettingsContext } from "@/context/settingsContext";
import { ContextProviders } from "@/context";
import { ThemeProvider } from "@mui/material";
import getTheme from "@/theme";
import 'react-toastify/dist/ReactToastify.css';

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
  const { theme, fontScale, fontWeightScale } = useContext(SettingsContext)

  return (
    <ThemeProvider theme={getTheme(theme, fontScale, fontWeightScale)}>
      <html lang="pt-BR">
        <body>
          {children}
        </body>
      </html>
    </ThemeProvider >
  );
}
