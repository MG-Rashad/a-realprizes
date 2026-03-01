'use client'

import { useLang } from '@/components/lang-provider'

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="py-12 px-4 border-t border-border/50 bg-background">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-Xm5lSaNCY5rlQMt8e92Nn9uWHf61og.png"
            alt="My Logo"
            className="w-8 h-8 rounded-xl object-cover"
          />
          <span className="font-serif font-bold shimmer-text">My Logo</span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-4" aria-label="Footer navigation">
          {t.footer.links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Rights */}
        <p className="text-xs text-muted-foreground text-center">{t.footer.rights}</p>
      </div>
    </footer>
  )
}
