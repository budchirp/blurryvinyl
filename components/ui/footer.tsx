import type React from 'react'

import { Container } from '@/components/container'
import { Logo } from '@/components/logo'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export const Footer: React.FC = async () => {
  const t = await getTranslations('common')

  return (
    <footer className='bg-background-primary/50 backdrop-blur-xs border-t border-border flex min-h-16 w-full items-center relative justify-center'>
      <Container className='flex h-full flex-col md:flex-row md:items-center gap-1 md:justify-between py-4'>
        <Logo />

        <Link className='font-medium text-text-accent-secondary' href='https://cankolay.com'>
          {t('footer')}
        </Link>
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'
