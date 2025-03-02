import type React from 'react'

import { cn } from '@/lib/cn'
import { Box } from '@/components/box'
import { Logo } from '@/components/logo'
import { Disc3 } from 'lucide-react'

import type { Song } from '@/types/song'

export type PlayerBackgroundProps = {
  children: React.ReactNode
  image: PlayerProps['image']
  orientation: PlayerProps['orientation']
}

export type PlayerProps = Song & {
  orientation: 'vertical' | 'horizontal'
}

export const PlayerBackground: React.FC<PlayerBackgroundProps> = ({
  children,
  image,
  orientation
}: PlayerBackgroundProps): React.ReactNode => {
  return (
    <div
      className={cn(
        'select-none z-50 relative flex p-16 min-w-72 min-h-128 w-90 h-160 max-w-108 max-h-192 items-center justify-center bg-black overflow-hidden',
        orientation === 'horizontal' && 'px-8'
      )}
      style={{
        aspectRatio: '9 / 16'
      }}
    >
      <div className='absolute left-0 top-0 select-none size-full blur-2xl opacity-75'>
        <img src={image} alt='album' className='object-fill size-full' />
      </div>

      <div className='flex items-center justify-center size-full'>{children}</div>

      <Logo domain link={false} className='text-lg absolute bottom-4 right-4' />
    </div>
  )
}
PlayerBackground.displayName = 'PlayerBackground'

export const Player: React.FC<PlayerProps> = ({
  title,
  artist,
  image,
  orientation
}: PlayerProps): React.ReactNode => {
  return (
    <Box className='relative flex w-full h-min flex-col' padding='small' variant='primary'>
      <div
        className={cn(
          'absolute inset-0 overflow-hidden w-full h-3/4 blur-3xl opacity-75',
          orientation === 'horizontal' && 'h-full w-2/4'
        )}
      >
        <img src={image} alt='album' className='object-fill size-full select-none' />
      </div>

      <div
        className={cn(
          'flex flex-col z-10 size-full gap-2 relative overflow-hidden',
          orientation === 'horizontal' && 'flex-row'
        )}
      >
        <div
          className={cn(
            'border border-border aspect-square flex items-center justify-center rounded-2xl',
            orientation === 'horizontal' && 'size-16'
          )}
        >
          <img
            className={cn(
              'aspect-square rounded-2xl object-cover',
              orientation === 'horizontal' ? 'size-16' : 'size-full'
            )}
            src={image}
            alt='album'
          />
        </div>

        <div
          className={cn(
            'flex gap-2 flex-col px-2 pb-2 pt-1',
            orientation === 'horizontal' && 'pe-2 py-1 ps-0 justify-center'
          )}
        >
          <h2 className='flex items-center gap-1.5'>
            <Disc3
              color='white'
              className='flex text-text-primary items-center justify-center'
              size={16}
            />

            <span className='text-lg flex-1 font-bold leading-none break-words'>{title || ''}</span>
          </h2>

          <h2 className='font-medium flex items-center leading-none text-text-tertiary break-words'>
            {artist || ''}
          </h2>
        </div>
      </div>
    </Box>
  )
}
Player.displayName = 'Player'
