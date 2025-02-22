import type React from 'react'
import type { ComponentProps } from 'react'

import { appDomain, appName } from '@/data'
import { cn } from '@/lib/cn'
import Link from 'next/link'

export type LogoProps = {
  link?: boolean
  domain?: boolean
} & Omit<ComponentProps<'h1'>, 'children'>

export const Logo: React.FC<LogoProps> = ({
  className,
  link = true,
  domain = false,
  ...props
}: LogoProps): React.ReactNode => {
  const LogoComponent = (
    <h1 {...props} className={cn('text-text-primary text-2xl font-bold', className)}>
      {domain ? appDomain : appName}
    </h1>
  )

  return link ? <Link href='/'>{LogoComponent}</Link> : LogoComponent
}
Logo.displayName = 'Logo'
