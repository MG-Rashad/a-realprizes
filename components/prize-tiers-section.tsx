'use client'

import { useLang } from '@/components/lang-provider'
import { cn } from '@/lib/utils'
import { Award, Star, Crown, Diamond, Gem, Sparkles, Trophy, Coins } from 'lucide-react'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

type Tier = {
  id: string
  name: string
  freq: string
  prize: string
  desc: string
  cta: string
  color: string
  prizes?: string[]
  isGrand?: boolean
}

const TIER_ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  'copper-daily':       Coins,
  'silver-weekly':      Coins,
  'gold-monthly':       Coins,
  'copper-quarterly':   Crown,
  'silver-biannual':    Gem,
  'gold-annual':        Trophy,
  'diamond-grand':      Diamond,
}

// Per-tier hover glow color
const TIER_GLOW_COLOR: Record<string, string> = {
  'copper-daily':       'rgba(184,115,51,0.40)',
  'silver-weekly':      'rgba(158,158,158,0.40)',
  'gold-monthly':       'rgba(255,215,0,0.35)',
  'copper-quarterly':   'rgba(184,115,51,0.40)',
  'silver-biannual':    'rgba(158,158,158,0.40)',
  'gold-annual':        'rgba(255,215,0,0.35)',
  'diamond-grand':      'rgba(158,158,158,0.40)',
}

const TIER_SHADOW_REST: Record<string, string> = {
  'copper-daily':       '0 4px 24px rgba(184,115,51,0.15), 0 1px 4px rgba(0,0,0,0.06)',
  'silver-weekly':      '0 4px 24px rgba(158,158,158,0.18), 0 1px 4px rgba(0,0,0,0.06)',
  'gold-monthly':       '0 4px 32px rgba(255,215,0,0.18), 0 1px 4px rgba(0,0,0,0.06)',
  'copper-quarterly':   '0 4px 24px rgba(184,115,51,0.15), 0 1px 4px rgba(0,0,0,0.06)',
  'silver-biannual':    '0 4px 24px rgba(158,158,158,0.18), 0 1px 4px rgba(0,0,0,0.06)',
  'gold-annual':        '0 4px 32px rgba(255,215,0,0.18), 0 1px 4px rgba(0,0,0,0.06)',
  'diamond-grand':      '0 4px 24px rgba(158,158,158,0.18), 0 1px 4px rgba(0,0,0,0.06)',
}

const TIER_SHADOW_HOVER: Record<string, string> = {
  'copper-daily':       '0 12px 40px rgba(184,115,51,0.32), 0 2px 8px rgba(0,0,0,0.08)',
  'silver-weekly':      '0 12px 40px rgba(158,158,158,0.36), 0 2px 8px rgba(0,0,0,0.08)',
  'gold-monthly':       '0 12px 48px rgba(255,215,0,0.36), 0 2px 8px rgba(0,0,0,0.08)',
  'copper-quarterly':   '0 12px 40px rgba(184,115,51,0.32), 0 2px 8px rgba(0,0,0,0.08)',
  'silver-biannual':    '0 12px 40px rgba(158,158,158,0.36), 0 2px 8px rgba(0,0,0,0.08)',
  'gold-annual':        '0 12px 48px rgba(255,215,0,0.36), 0 2px 8px rgba(0,0,0,0.08)',
  'diamond-grand':      '0 12px 40px rgba(158,158,158,0.36), 0 2px 8px rgba(0,0,0,0.08)',
}

// Single source of truth for gold color used across icon, prize value, and button hover
const GOLD = '#FFD700'

function CtaButton({
  label, isDiamond, isGold, isCopper, ctaStyle, wide,
}: {
  label: string
  isDiamond: boolean
  isGold: boolean
  isCopper: boolean
  ctaStyle: React.CSSProperties
  wide: boolean
}) {
  const [hovered, setHovered] = useState(false)

  let style: React.CSSProperties = ctaStyle

  // Diamond always uses full-width button on mobile, fixed-width on md+ (same as gold wide cards)
  const className = cn(
    'py-3 rounded-2xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
    wide
      ? 'mt-0 self-center w-auto px-8 shrink-0'
      : 'mt-auto w-full'
  )

  if (isCopper) {
    style = hovered
      ? { background: '#B87333', color: '#ffffff', boxShadow: '0 4px 16px rgba(184,115,51,0.35)' }
      : { background: '#f5f5f5', color: '#333333', border: '1px solid #e0e0e0' }
  } else if (isGold) {
    style = hovered
      ? { background: GOLD, color: '#1a1000', boxShadow: '0 4px 20px rgba(255,215,0,0.45)' }
      : { background: '#f5f5f5', color: '#333333', border: '1px solid #e0e0e0' }
  } else if (isDiamond) {
    style = hovered
      ? { background: '#eeeeee', color: '#333333', border: '1px solid #d5d5d5', boxShadow: '0 4px 14px rgba(0,0,0,0.10)' }
      : { background: '#f5f5f5', color: '#333333', border: '1px solid #e0e0e0' }
  } else {
    style = hovered ? { background: 'rgba(0,0,0,0.05)', border: '1px solid #e0e0e0', color: '#333333' } : { background: '#f5f5f5', color: '#333333', border: '1px solid #e0e0e0' }
  }

  return (
    <button
      className={className}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </button>
  )
}

function TierCard({ tier, wide = false }: { tier: Tier; wide?: boolean }) {
  const Icon = TIER_ICON_MAP[tier.id] ?? Award
  const isGold = tier.id === 'gold-monthly' || tier.id === 'gold-annual'
  const isCopper = tier.id === 'copper-daily' || tier.id === 'copper-quarterly'
  const isDiamond = !!tier.isGrand

  const restShadow = TIER_SHADOW_REST[tier.id] ?? TIER_SHADOW_REST['copper-daily']
  const hoverShadow = TIER_SHADOW_HOVER[tier.id] ?? TIER_SHADOW_HOVER['copper-daily']

  // Crystal glass CTA for diamond — same neutral base as silver
  const ctaStyle = isDiamond
    ? { background: '#f5f5f5', color: '#333333', border: '1px solid #e0e0e0' }
    : {}

  return (
    <div
      className={cn(
        'relative flex flex-col gap-5 p-6 rounded-3xl border',
        'backdrop-blur-sm bg-white/80',
        isDiamond
          ? 'border-border/60'
          : isGold
          ? 'border-yellow-300/60'
          : 'border-border/60',
        'transition-all duration-300 cursor-default',
        wide && 'md:flex-row md:items-center md:gap-8 [dir=rtl]:md:flex-row-reverse'
      )}
      style={{
        boxShadow: restShadow,
        transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = hoverShadow
        el.style.transform = 'translateY(-6px) scale(1.01)'
        el.style.borderColor = TIER_GLOW_COLOR[tier.id] ?? 'rgba(255,215,0,0.4)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = restShadow
        el.style.transform = 'translateY(0px) scale(1)'
        el.style.borderColor = ''
      }}
    >
      {/* Header */}
      <div className={cn('flex items-center gap-3', wide && 'md:flex-col md:items-start md:min-w-48 md:shrink-0')}>
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: isDiamond
              ? 'linear-gradient(135deg, #BDBDBD22, #BDBDBD44)'
              : `linear-gradient(135deg, ${isGold ? GOLD : tier.color}22, ${isGold ? GOLD : tier.color}44)`,
            border: isDiamond ? '1px solid #BDBDBD60' : `1px solid ${isGold ? GOLD : tier.color}60`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: isDiamond ? '#BDBDBD' : isGold ? GOLD : tier.color }} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg text-foreground leading-tight tracking-wide">{tier.name}</span>
          <span className="text-xs text-muted-foreground">{tier.freq}</span>
        </div>
        {wide && (
          <div className="hidden md:flex flex-col mt-4">
            <span
              className="font-serif font-bold leading-none tracking-tight"
              style={isDiamond
                ? { fontSize: '2.15rem', color: '#111111', fontWeight: 700 }
                : { color: isGold ? GOLD : tier.color, fontSize: '1.875rem' }
              }
            >
              {tier.prize}
            </span>
            <span
              className="text-sm mt-1"
              style={{
                color: isDiamond ? 'rgba(30,30,30,0.75)' : undefined,
                fontWeight: isDiamond ? 600 : undefined,
              }}
            >
              {tier.desc}
            </span>
          </div>
        )}
      </div>

      {/* Prize value (normal) */}
      {!wide && (
        <div className="flex flex-col">
          <span className="font-serif font-bold text-3xl leading-none tracking-tight" style={{ color: isGold ? GOLD : tier.color }}>
            {tier.prize}
          </span>
          <span className="text-muted-foreground text-sm mt-1">{tier.desc}</span>
        </div>
      )}
      {/* Prize value on mobile for wide cards */}
      {wide && (
        <div className="flex flex-col md:hidden">
          <span
            className="font-serif font-bold leading-none tracking-tight"
            style={isDiamond
              ? { fontSize: '2.15rem', color: '#111111', fontWeight: 700 }
              : { color: isGold ? GOLD : tier.color, fontSize: '1.875rem' }
            }
          >
            {tier.prize}
          </span>
          <span
            className="text-sm mt-1"
            style={{
              color: isDiamond ? 'rgba(30,30,30,0.75)' : undefined,
              fontWeight: isDiamond ? 600 : undefined,
            }}
          >
            {tier.desc}
          </span>
        </div>
      )}

      {/* Prize list */}
      {tier.prizes && tier.prizes.length > 0 && (
        <ul className={cn('flex flex-col gap-2 flex-1', wide && 'md:columns-2 md:gap-x-8')}>
          {tier.prizes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm break-inside-avoid" style={{ color: isDiamond ? 'rgba(20,20,20,0.85)' : undefined }}>
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: isDiamond ? 'rgba(80,80,90,0.80)' : tier.color }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <CtaButton
        label={tier.cta}
        isDiamond={isDiamond}
        isGold={isGold}
        isCopper={isCopper}
        ctaStyle={ctaStyle}
        wide={wide}
      />
    </div>
  )
}

export function PrizeTiersSection() {
  const { t } = useLang()
  const tiers = t.prizeTiers.tiers as Tier[]

  const gridTiers = tiers.filter((t) => !t.isGrand)
  const grandTier = tiers.find((t) => t.isGrand)

  return (
    <section id="prizes" className="py-24 px-4 bg-background" aria-label="Prize tiers">
      <div className="max-w-6xl mx-auto">
        {/* Header — badge only, no title text */}
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary border border-primary/30">
            {t.prizeTiers.badge}
          </span>
          <p className="text-muted-foreground text-lg max-w-2xl text-balance">{t.prizeTiers.subtitle}</p>
        </div>

        {/* Row 1 — first 3 tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {gridTiers.slice(0, 3).map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* Row 2 — next 3 tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {gridTiers.slice(3, 6).map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* Grand Diamond — centered, larger */}
        {grandTier && (
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <TierCard tier={grandTier} wide />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
