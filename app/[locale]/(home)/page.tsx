import type React from 'react'

import { ClientHomePage } from '@/app/[locale]/(home)/page.client'
import { MetadataManager } from '@/lib/metadata-manager'
import { getTranslations } from 'next-intl/server'

import type { Metadata } from 'next'

const HomePage: React.FC = (): React.ReactNode => {
  return <ClientHomePage />
}

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('home')

  return MetadataManager.generate(t('text'), t('description'))
}

export default HomePage
