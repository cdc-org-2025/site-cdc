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
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <ContextProviders>
      <InnerRootLayout locale={locale}>{children}</InnerRootLayout>
    </ContextProviders>
  );
}

function InnerRootLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const { theme, fontScale, fontWeightScale } = useContext(SettingsContext)

  return (
    <ThemeProvider theme={getTheme(theme, fontScale, fontWeightScale)}>
      <html lang={locale}>
        <body>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
