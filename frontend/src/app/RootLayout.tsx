'use client'

import "./globals.css";
import { useContext } from "react";
import { SettingsContext } from "@/context/settingsContext";
import { ContextProviders } from "@/context";
import { ThemeProvider } from "@mui/material";
import getTheme from "@/theme";
import 'react-toastify/dist/ReactToastify.css';
// import ButtonAccessible from "@/components/atoms/ButtonAccessible";
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContextProviders>
      <InnerRootLayout>{children}</InnerRootLayout>
    </ContextProviders>
  );
}

function InnerRootLayout({ children }: { children: React.ReactNode }) {
  const {
    theme,
    fontScale,
    fontWeightScale,
    grayscale,
    highContrast,
    negativeContrast,
  } = useContext(SettingsContext);

  const getAccessibilityFilter = () => {
    if (grayscale) return 'grayscale(1)';
    if (highContrast) return 'contrast(2)';
    if (negativeContrast) return 'invert(1) contrast(1.5)';
    return 'none';
  };

  return (
    <ThemeProvider theme={getTheme(theme, fontScale, fontWeightScale)}>
      <html lang="pt-BR">
        <head>
          {/* Google Translate */}
          <Script
            id="google-translate-script"
            strategy="afterInteractive"
            src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          />
          <Script id="google-translate-init" strategy="afterInteractive">
            {`
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'pt',
                  includedLanguages: 'en,pt,es,fr,it,de',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
              }
            `}
          </Script>

          {/* Google Analytics */}
          <Script
            id="gtag-script"
            strategy="afterInteractive"
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-8LN48XSLGF"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8LN48XSLGF');
            `}
          </Script>
        </head>
        <body>
          {/* <ButtonAccessible /> */}
          {/* Elemento obrigatório para o Google Translate funcionar */}
          <div id="google_translate_element"></div>

          <div
            id="app-content"
            style={{ filter: getAccessibilityFilter(), transition: 'filter 0.3s ease' }}
          >
            {children}
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
