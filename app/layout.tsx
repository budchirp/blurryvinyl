import type React from 'react'

import { Lexend } from 'next/font/google'
import { appName, appUrl } from '@/data'
import { cn } from '@/lib/cn'

import type { LayoutProps } from '@/types/layout'
import type { Metadata, Viewport } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  generator: 'Next.js',
  applicationName: appName,
  creator: 'Can Kolay',
  publisher: 'Can Kolay',
  authors: [{ name: 'Can Kolay', url: 'https://cankolay.com' }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0a0e' }
  ]
}

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-main'
})

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps): React.ReactNode => {
  return (
    <html className='dark' suppressHydrationWarning lang='en-US'>
      <body
        className={cn(
          'relative size-full text-text-primary bg-background-primary',
          lexend.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}

export default Layout
