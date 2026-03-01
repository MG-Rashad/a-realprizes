'use client'

import { useLang } from '@/components/lang-provider'
import { useEffect, useRef, useState } from 'react'
import { Shield, Eye, Lock, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const BADGE_ICONS = [Shield, Eye, Lock, Award]

const WINNER_EVENTS = [
  { name: 'Ahmed M.', amount: '2,500 LYD', nameAr: 'أحمد م.' },
  { name: 'Sara K.', amount: 'BMW X5', nameAr: 'سارة ك.' },
  { name: 'Omar B.', amount: '10,000 LYD', nameAr: 'عمر ب.' },
  { name: 'Nour F.', amount: 'iPhone 16 Pro', nameAr: 'نور ف.' },
  { name: 'Khalid A.', amount: '5,000 LYD', nameAr: 'خالد أ.' },
  { name: 'Layla H.', amount: 'Dubai Trip', nameAr: 'ليلى ح.' },
  { name: 'Youssef R.', amount: '15,000 LYD', nameAr: 'يوسف ر.' },
  { name: 'Mona S.', amount: 'MacBook Pro', nameAr: 'منى س.' },
  { name: 'Tarek W.', amount: '8,000 LYD', nameAr: 'طارق و.' },
  { name: 'Dina Z.', amount: 'Rolex Watch', nameAr: 'دينا ز.' },
]

// Prize visuals for each testimonial (index-matched to testimonials array)
const TESTIMONIAL_PRIZE_IMAGES = [
  { src: '/images/prize-bmw.jpg', alt: 'BMW 2025', label: 'BMW 2025' },
  { src: '/images/prize-cash.jpg', alt: '50,000 LYD Cash', label: '50,000 LYD' },
  { src: '/images/prize-dubai.jpg', alt: 'Dubai 5-Star Trip', label: 'Dubai Trip' },
]

export function SocialProofSection() {
  const { lang, t } = useLang()
  const [activeIdx, setActiveIdx] = useState(0)
  const tickerRef = useRef<HTMLDivElement>(null)

  const testimonials = t.socialProof.testimonials
  const badges = t.socialProof.trustBadges

  const prev = () => setActiveIdx((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setActiveIdx((i) => (i + 1) % testimonials.length)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [testimonials.length])

  return (
    <section id="winners" className="py-24 px-4 bg-muted/40" aria-label="Winner testimonials">
      {/* Winner ticker */}
      <div
        className="w-full overflow-hidden border-y border-border/40 bg-primary/5 py-3 mb-16"
        aria-label="Live winner announcements"
        aria-live="polite"
      >
        <div ref={tickerRef} className="flex gap-8 animate-ticker whitespace-nowrap">
          {[...WINNER_EVENTS, ...WINNER_EVENTS].map((w, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-sm text-foreground/80 shrink-0">
              <span className="w-2 h-2 rounded-full bg-primary inline-block shrink-0" />
              <span className="font-semibold text-primary">
                {lang === 'ar' ? w.nameAr : w.name}
              </span>
              <span className="text-muted-foreground">{t.socialProof.winnerTicker}</span>
              <span className="font-bold text-foreground">{w.amount}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary border border-primary/30">
            {t.socialProof.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance section-title">
            {t.socialProof.title}
          </h2>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {badges.map((badge, i) => {
            const Icon = BADGE_ICONS[i]
            return (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border text-sm text-foreground font-medium"
              >
                <Icon className="w-4 h-4 text-primary" />
                {badge.label}
              </div>
            )
          })}
        </div>

        {/* Testimonial carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${lang === 'ar' ? activeIdx * 100 : -activeIdx * 100}%)` }}
            >
              {testimonials.map((t_item, i) => {
                const prizeImg = TESTIMONIAL_PRIZE_IMAGES[i]
                return (
                <div key={i} className="w-full shrink-0 px-2">
                  <div className="bg-card gold-border-glow rounded-3xl overflow-hidden flex flex-col md:flex-row">
                    {/* Prize image */}
                    {prizeImg && (
                      <div className="md:w-48 shrink-0 bg-muted flex items-center justify-center relative overflow-hidden min-h-40 md:min-h-0">
                        <img
                          src={prizeImg.src}
                          alt={prizeImg.alt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const el = e.currentTarget as HTMLImageElement
                            el.style.display = 'none'
                            const parent = el.parentElement
                            if (parent) {
                              parent.innerHTML = `<span class="text-4xl font-bold text-primary/30 select-none">${prizeImg.label}</span>`
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute bottom-3 start-3 end-3 text-center text-xs font-bold text-white bg-black/50 rounded-full px-2 py-0.5">
                          {prizeImg.label}
                        </span>
                      </div>
                    )}
                    {/* Text content */}
                    <div className="p-8 md:p-10 text-center flex flex-col items-center gap-5 flex-1 justify-center">
                      {/* Stars */}
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                      </div>
                      {/* Quote */}
                      <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed max-w-xl font-medium">
                        &ldquo;{t_item.text}&rdquo;
                      </blockquote>
                      {/* Author */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-primary font-bold text-lg">
                          {t_item.name[0]}
                        </div>
                        <span className="font-bold text-foreground">{t_item.name}</span>
                        <span className="text-muted-foreground text-sm">{t_item.location}</span>
                        <span className="mt-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/30">
                          {t_item.prize}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                )
              })}
            </div>
          </div>

          {/* Carousel controls */}
          <button
            onClick={lang === 'ar' ? next : prev}
            className="absolute top-1/2 -translate-y-1/2 -start-4 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={lang === 'ar' ? prev : next}
            className="absolute top-1/2 -translate-y-1/2 -end-4 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-200',
                  i === activeIdx ? 'bg-primary w-6' : 'bg-border hover:bg-primary/40'
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
