import type { Metadata } from 'next'
import { Cairo, Playfair_Display } from 'next/font/google'
import './globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'My Logo — قيد الاختبار | My Logo Still Test',
  description: 'انضم الآن واربح جوائز فاخرة. Join now and win luxury prizes. Fast. Easy. Secure.',
  generator: 'v0.app',
  keywords: ['sweepstakes', 'prizes', 'luxury', 'سحب', 'جوائز', 'مسابقات'],
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-Xm5lSaNCY5rlQMt8e92Nn9uWHf61og.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
