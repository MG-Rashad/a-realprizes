'use client'

import { useState } from 'react'
import { useLang } from '@/components/lang-provider'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const { setLang, lang, t } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: t.nav.home, href: '#' },
    { label: t.nav.prizes, href: '#prizes' },
    { label: t.nav.winners, href: '#winners' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0" aria-label="My Logo Home">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-Xm5lSaNCY5rlQMt8e92Nn9uWHf61og.png"
            alt="My Logo"
            className="w-9 h-9 rounded-xl object-cover"
          />
          <span className="font-serif text-xl font-bold shimmer-text hidden sm:inline-block">
            My Logo
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-medium text-white/80 hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language switcher */}
          <div className="flex items-center gap-1 bg-white/10 rounded-full p-1 border border-white/20">
            <button
              onClick={() => setLang('ar')}
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium transition-all duration-200',
                lang === 'ar'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-white/70 hover:text-white'
              )}
              aria-label="Switch to Arabic"
            >
              عربي
            </button>
            <button
              onClick={() => setLang('en')}
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium transition-all duration-200',
                lang === 'en'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-white/70 hover:text-white'
              )}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Auth buttons (desktop) */}
          <a
            href="#"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm border border-white/30 text-white hover:border-primary/60 hover:text-primary transition-colors"
          >
            {t.nav.login}
          </a>
          <a
            href="#"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            {t.nav.register}
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-medium text-white/80 hover:text-primary py-2 border-b border-white/10 last:border-0"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <a
              href="#"
              className="flex-1 text-center px-4 py-2 rounded-full text-sm border border-white/30 text-white"
            >
              {t.nav.login}
            </a>
            <a
              href="#"
              className="flex-1 text-center px-4 py-2 rounded-full text-sm bg-primary text-primary-foreground font-semibold"
            >
              {t.nav.register}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
