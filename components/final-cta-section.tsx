'use client'

import { useState } from 'react'
import { useLang } from '@/components/lang-provider'
import { ArrowRight, LogIn, UserCheck } from 'lucide-react'

export function FinalCtaSection() {
  const { t } = useLang()
  const [agreed, setAgreed] = useState(false)

  return (
    <section
      id="register"
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="cta-title"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 bg-background"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, oklch(0.78 0.16 80 / 0.07) 0%, var(--background) 70%)',
        }}
      />
      {/* Top border line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      {/* Bottom border line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Headline */}
        <h2
          id="cta-title"
          className="text-5xl md:text-7xl font-serif font-bold shimmer-text text-balance leading-tight"
        >
          {t.finalCta.headline}
        </h2>
        <p className="text-2xl md:text-3xl text-foreground/80 font-medium text-balance">
          {t.finalCta.subheadline}
        </p>

        {/* Terms checkbox */}
        <label className="flex items-center gap-3 cursor-pointer group select-none">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
              agreed ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/60'
            }`}
            onClick={() => setAgreed(!agreed)}
          >
            {agreed && (
              <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
                <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            {t.finalCta.terms}
          </span>
        </label>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <button
            disabled={!agreed}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-bold shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] hover:shadow-yellow-400/30 active:scale-[0.98]"
            style={{
              background: agreed ? 'linear-gradient(45deg, #FFD700, #FFB200)' : undefined,
              color: agreed ? '#1a1000' : undefined,
            }}
          >
            <ArrowRight className="w-5 h-5" />
            {t.finalCta.register}
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-border text-foreground font-semibold hover:border-primary/50 hover:text-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
            <LogIn className="w-5 h-5" />
            {t.finalCta.login}
          </button>
        </div>

        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
          <UserCheck className="w-4 h-4" />
          {t.finalCta.guest}
        </button>
      </div>
    </section>
  )
}

export function StickyMobileCta() {
  const { t } = useLang()

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden p-4 bg-gradient-to-t from-background via-background/95 to-transparent">
      <a
        href="#register"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base shadow-2xl shadow-primary/40 hover:opacity-95 hover:scale-[1.01] transition-all duration-200 animate-pulse-gold"
        style={{ background: 'linear-gradient(45deg, #FFD700, #FFB200)', color: '#1a1000' }}
      >
        {t.hero.cta}
      </a>
    </div>
  )
}
