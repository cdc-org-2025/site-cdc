import { fetchMessages } from '@/utils/getMessages'
import RootLayout from './RootLayout'
import ButtonAccessible from '@/components/atoms/ButtonAccessible'

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
