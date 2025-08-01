import HomePage from '@/features/home'
import HeaderBanner from '@/components/templates/HeaderBanner'
import Footer from '@/components/molecules/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function Home() {
  return (
    <>
      <GoogleAnalytics />
      <HeaderBanner />
      <HomePage />
      <Footer />
    </>
  )
}
