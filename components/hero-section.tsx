'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useLang } from '@/components/lang-provider'
import { Flame, Users, DollarSign, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return value
}

type Slide = {
  type: 'image' | 'video'
  src: string
  poster?: string
}

const SLIDES: Slide[] = [
  { type: 'image', src: '/images/slide-iphone.jpg' },
  { type: 'image', src: '/images/slide-ps5.jpg' },
  { type: 'image', src: '/images/slide-gold-coins.jpg' },
  { type: 'image', src: '/images/slide-silver-coins.jpg' },
  { type: 'image', src: '/images/slide-libyana.jpg' },
  { type: 'image', src: '/images/slide-almadar.jpg' },
  { type: 'image', src: '/images/hero.jpg' },
]

function SlideMedia({ slide, active }: { slide: Slide; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (active) {
      v.currentTime = 0
      v.play().catch(() => { })
    } else {
      v.pause()
    }
  }, [active])

  if (slide.type === 'video') {
    return (
      <video
        ref={videoRef}
        src={slide.src}
        poster={slide.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className={cn(
        'absolute inset-0 bg-cover bg-center bg-no-repeat',
        active ? 'animate-ken-burns' : ''
      )}
      style={{ backgroundImage: `url('${slide.src}')` }}
      role="presentation"
    />
  )
}

export function HeroSection() {
  const { t } = useLang()
  const members = useCountUp(124_863)
  const pool = useCountUp(280_000)
  const [activeSlide, setActiveSlide] = useState(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((idx: number) => {
    setActiveSlide((idx + SLIDES.length) % SLIDES.length)
  }, [])

  const next = useCallback(() => goTo(activeSlide + 1), [activeSlide, goTo])
  const prev = useCallback(() => goTo(activeSlide - 1), [activeSlide, goTo])

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActiveSlide((i) => (i + 1) % SLIDES.length)
    }, 6000)
    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
    }
  }, [])

  const manualNav = (fn: () => void) => {
    if (autoRef.current) clearInterval(autoRef.current)
    fn()
    autoRef.current = setInterval(() => {
      setActiveSlide((i) => (i + 1) % SLIDES.length)
    }, 6000)
  }

  const stats = [
    { icon: Users, value: members.toLocaleString(), label: t.hero.membersLabel },
    { icon: DollarSign, value: `${pool.toLocaleString()} د.ل`, label: t.hero.prizePoolLabel },
  ]

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      aria-label="Hero section"
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            i === activeSlide ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden={i !== activeSlide}
        >
          <SlideMedia slide={slide} active={i === activeSlide} />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Floating light orbs */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none animate-float"
        style={{
          top: '15%',
          left: '10%',
          background: 'radial-gradient(circle, oklch(0.78 0.16 80 / 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animationDelay: '0s',
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none animate-float"
        style={{
          bottom: '20%',
          right: '12%',
          background: 'radial-gradient(circle, oklch(0.78 0.16 80 / 0.06) 0%, transparent 70%)',
          filter: 'blur(32px)',
          animationDelay: '2s',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-black/30 backdrop-blur-sm text-sm font-medium">
          <Flame className="w-4 h-4 fill-primary text-primary" />
          <span className="text-white/90 font-semibold">{t.hero.badge}</span>
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight text-balance shimmer-text tracking-wide">
            {t.hero.headline}
          </h1>
          <p className="text-3xl md:text-5xl font-serif font-semibold text-white/90 text-balance tracking-wide">
            {t.hero.headlineSub}
          </p>
        </div>

        {/* Gold gradient CTA */}
        <a
          href="#register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/40 hover:scale-105 hover:shadow-primary/60 active:scale-[0.98] transition-all duration-200"
          style={{
            background: 'linear-gradient(45deg, #FFD700, #FFB200)',
            color: '#1a1000',
          }}
        >
          {t.hero.cta}
        </a>

        {/* Live stats — equal size boxes */}
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-md mt-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 px-8 py-4 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 flex-1 min-w-[160px]"
            >
              <stat.icon className="w-5 h-5 text-primary mb-1" />
              <span className="text-2xl font-bold font-mono text-white">{stat.value}</span>
              <span className="text-xs text-white/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Slider controls — arrows only, no dots */}
      {SLIDES.length > 1 && (
        <>
          <button
            onClick={() => manualNav(prev)}
            className="absolute start-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => manualNav(next)}
            className="absolute end-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce z-10">
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  )
}
