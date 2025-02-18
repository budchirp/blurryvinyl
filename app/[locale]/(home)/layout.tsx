import type React from 'react'

import { Container } from '@/components/container'

import type { LayoutProps } from '@/types/layout'
import { Heading } from '@/components/heading'
import { getTranslations } from 'next-intl/server'

const Layout: React.FC<LayoutProps> = async ({ children }: LayoutProps) => {
  const t = await getTranslations('home')
  return (
    <Container>
      <Heading description={t('description')}>Blurry Vinyl</Heading>
      {children}
    </Container>
  )
}

export default Layout
