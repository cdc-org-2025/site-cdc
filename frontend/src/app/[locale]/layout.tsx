import { fetchMessages } from '@/utils/getMessages'
import RootLayout from './RootLayout'
import ButtonAccessible from '@/components/atoms/ButtonAccessible'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Centro de Desenvolvimento e Cidadania',
  description:
    'É uma Organização da Sociedade Civil, sem fins lucrativos, com atuação em âmbito local e nacional. Tem como missão contribuir para a transformação social na promoção da cidadania, por meio de atividades formativas, articulação, incidência em políticas públicas e assessoria técnica, tendo suas ações voltadas à promoção de atividades de relevância pública e social que fortaleçam a democracia e beneficiem a humanidade.',
  authors: {
    name: 'Renato Albuquerque',
    url: 'https://www.linkedin.com/in/renato-albuquerque-dev/',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function LocalePageLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await fetchMessages(locale)


  return (
    <RootLayout locale={locale} messages={messages}>
      {children}
      <ButtonAccessible />
    </RootLayout>
  )
}
