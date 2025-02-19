import { cn } from '@/lib/cn'
import { Box } from '@/components/box'
import { Logo } from '@/components/logo'
import { Disc3 } from 'lucide-react'
import type { Song } from '@/types/song'

export type PlayerBackgroundProps = {
  image: string
  children: React.ReactNode
}

export type PlayerProps = Song & {
  orientation: 'vertical' | 'horizontal'
}

export const PlayerBackground: React.FC<PlayerBackgroundProps> = ({
  image,
  children
}: PlayerBackgroundProps) => {
  return (
    <div
      id='SELECT ME'
      className='select-none z-50 m-2 relative flex p-12 md:p-22 w-[18rem] h-[32rem] md:w-[27rem] md:h-[48rem] items-center justify-center border border-border overflow-hidden size-full'
    >
      <div className='absolute left-0 top-0 select-none size-full blur-2xl opacity-75'>
        <img src={image} alt='album' className='object-fill size-full' />
      </div>

      <div className='flex items-center justify-center size-full'>{children}</div>

      <div className='absolute bottom-4 w-full right-4'>
        <Logo domain link={false} className='text-lg absolute bottom-4 right-4' />
      </div>
    </div>
  )
}

export const Player: React.FC<PlayerProps> = ({
  title,
  artist,
  image,
  orientation
}: PlayerProps) => {
  return (
    <div className={cn('mx-auto flex select-none w-full')}>
      <Box className='relative flex flex-col overflow-auto' padding='small' variant='primary'>
        <div
          className={cn(
            'absolute left-0 top-0 select-none w-full h-3/4 blur-3xl opacity-75',
            orientation === 'horizontal' && 'h-full w-2/4'
          )}
        >
          <img src={image} alt='album' className='object-fill size-full' />
        </div>

        <div
          className={cn(
            'flex flex-col z-10 size-full gap-2 relative overflow-hidden',
            orientation === 'horizontal' && 'flex-row items-center'
          )}
        >
          <div className='border border-border aspect-square rounded-2xl flex overflow-hidden select-none items-center justify-center'>
            <img
              className={cn(
                'aspect-square rounded-2xl size-full object-cover',
                orientation === 'horizontal' && 'size-16'
              )}
              src={image}
              alt='album'
            />
          </div>

          <div
            className={cn(
              'flex gap-2 flex-col px-2 pb-2 pt-1',
              orientation === 'horizontal' && 'pe-2 py-1 ps-0 justify-between'
            )}
          >
            <div className='grid gap-1'>
              <h2 className='flex gap-1.5 items-center'>
                <Disc3 className='flex items-center justify-center' size={16} />

                <span className='text-lg flex-1 grow font-bold leading-none text-ellipsis'>
                  {title || ''}
                </span>
              </h2>

              <h2 className='font-medium leading-none text-text-tertiary'>{artist || ''}</h2>
            </div>
          </div>
        </div>
      </Box>
    </div>
  )
}
