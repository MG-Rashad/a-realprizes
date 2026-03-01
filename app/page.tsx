import { LangProvider } from '@/components/lang-provider'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { HowItWorksSection } from '@/components/how-it-works-section'
import { SocialProofSection } from '@/components/social-proof-section'
import { PrizeTiersSection } from '@/components/prize-tiers-section'
import { FinalCtaSection, StickyMobileCta } from '@/components/final-cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <SocialProofSection />
          <PrizeTiersSection />
          <FinalCtaSection />
        </main>
        <Footer />
        <StickyMobileCta />
      </div>
    </LangProvider>
  )
}
