'use client'

import "../globals.css";
import { useContext } from "react";
import { SettingsContext } from "@/context/settingsContext";
import { ContextProviders } from "@/context";
import { ThemeProvider } from "@mui/material";
import getTheme from "@/theme";
import { ToastContainer } from 'react-toastify';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages | undefined;
}) {
  return (
    <ContextProviders>
      <InnerRootLayout locale={locale} messages={messages}>{children}</InnerRootLayout>
    </ContextProviders>
  );
}

function InnerRootLayout({
  children,
  locale,
  messages
}: {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages | undefined;
}) {
  const { theme } = useContext(SettingsContext);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider theme={getTheme(theme)}>
        <html lang={locale}>
          <body>
            <ToastContainer />
            {children}
          </body>
        </html>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
