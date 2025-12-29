import Hero from '@/components/Hero'
import ImpactMetrics from '@/components/ImpactMetrics'
import HowItWorks from '@/components/HowItWorks'
import ActiveCampaigns from '@/components/ActiveCampaigns'
import WhySalvus from '@/components/WhySalvus'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ImpactMetrics />
      <HowItWorks />
      <ActiveCampaigns />
      <WhySalvus />
      <Footer />
    </main>
  )
}


