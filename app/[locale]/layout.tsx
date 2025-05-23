import type React from 'react'

import { appName, appUrl } from '@/data'
import { Footer } from '@/components/ui/footer'
import { routing } from '@/lib/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages, getTranslations } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import Script from 'next/script'

import type { Metadata } from 'next'
import type { DynamicLayoutProps } from '@/types/layout'
import { Container } from '@/components/container'

export const generateMetadata = async ({ params }: DynamicLayoutProps): Promise<Metadata> => {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: 'home'
  })

  return {
    description: t('description'),
    keywords: [''],
    title: {
      default: t('text'),
      template: `%s - ${appName}`
    },
    twitter: {
      card: 'summary',
      creator: 'Can Kolay',
      description: t('description'),
      title: {
        default: t('text'),
        template: `%s - ${appName}`
      }
    },
    openGraph: {
      siteName: appName,
      locale: 'en_US',
      type: 'website',
      description: t('description'),
      url: appUrl,
      countryName: 'Türkiye',
      title: {
        default: t('text'),
        template: `%s - ${appName}`
      }
    }
  }
}

const Layout: React.FC<DynamicLayoutProps> = async ({ children, params }: DynamicLayoutProps) => {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <div className='absolute z-0 inset-0 overflow-hidden'>
        <Container className='absolute inset-0'>
          <div className='absolute top-[10%] left-[15%] size-96 opacity-25 bg-accent-500 rounded-full blur-[128px]' />
          <div className='absolute top-[50%] left-[55%] size-96 opacity-25 bg-accent-800 rounded-full blur-[128px]' />
        </Container>
      </div>

      <div className='grid gap-4 relative z-10 size-full'>
        <div className='w-full min-h-screen'>
          <main className='size-full'>{children}</main>
        </div>

        <Footer />
      </div>

      <Script
        defer
        src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon={`{"token": "${process.env.CLOUDFLARE_TOKEN}"}`}
      />
    </NextIntlClientProvider>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default Layout
