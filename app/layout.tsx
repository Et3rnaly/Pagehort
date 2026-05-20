import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: {
    default: 'Zé das Frutas | Hortifrúti Fresh & Delivery',
    template: '%s | Zé das Frutas',
  },
  description: 'Levando saúde e frescor para sua mesa desde 1995. Compre frutas, verduras, legumes e muito mais com entrega rápida.',
  keywords: ['hortifruti', 'frutas', 'verduras', 'delivery', 'orgânicos', 'São Paulo'],
  authors: [{ name: 'Zé das Frutas' }],
  creator: 'Zé das Frutas',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Zé das Frutas',
    title: 'Zé das Frutas | Hortifrúti Fresh & Delivery',
    description: 'Levando saúde e frescor para sua mesa desde 1995. Compre frutas, verduras, legumes e muito mais.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zé das Frutas | Hortifrúti Fresh & Delivery',
    description: 'Levando saúde e frescor para sua mesa desde 1995.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#22c55e' },
    { media: '(prefers-color-scheme: dark)', color: '#16a34a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
