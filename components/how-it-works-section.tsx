'use client'

import { useLang } from '@/components/lang-provider'
import { UserPlus, Gift, Sparkles } from 'lucide-react'

const stepIcons = [UserPlus, Gift, Sparkles]

export function HowItWorksSection() {
  const { t } = useLang()

  return (
    <section id="how-it-works" className="py-24 px-4 bg-background" aria-label="How it works">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary border border-primary/30">
            {t.howItWorks.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance section-title">
            {t.howItWorks.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">{t.howItWorks.subtitle}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-border/60" />

          {t.howItWorks.steps.map((step, i) => {
            const Icon = stepIcons[i]
            return (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center gap-4 px-6 py-10 rounded-3xl bg-card gold-border-glow transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-lg shadow-primary/20">
                  {i + 1}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
