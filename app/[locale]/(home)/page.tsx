import type React from 'react'

import { ClientHomePage } from '@/app/[locale]/(home)/page.client'
import { MetadataManager } from '@/lib/metadata-manager'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/lib/i18n/routing'

import type { Metadata } from 'next'
import type { DynamicPageProps } from '@/types/page'

const HomePage: React.FC<DynamicPageProps> = async ({ params }: DynamicPageProps) => {
  const { locale } = await params

  setRequestLocale(locale)

  return <ClientHomePage />
}

export const generateMetadata = async ({ params }: DynamicPageProps): Promise<Metadata> => {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: 'home'
  })
  return MetadataManager.generate(t('text'), t('description'))
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default HomePage
