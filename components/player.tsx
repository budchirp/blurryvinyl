import { cn } from '@/lib/cn'
import { Box } from '@/components/box'
import { Logo } from '@/components/logo'
import { Disc3 } from 'lucide-react'
import type { Song } from '@/types/song'
import type { Ref } from 'react'

export type PlayerBackgroundProps = {
  children: React.ReactNode
  image: PlayerProps['image']
  orientation: PlayerProps['orientation']
  ref?: Ref<HTMLDivElement>
}

export type PlayerProps = Song & {
  orientation: 'vertical' | 'horizontal'
}

export const PlayerBackground: React.FC<PlayerBackgroundProps> = ({
  ref,
  children,
  image,
  orientation
}: PlayerBackgroundProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        'select-none z-50 relative flex p-12 md:p-22 w-[18rem] h-[32rem] md:w-[27rem] md:h-[48rem] items-center justify-center overflow-hidden size-full',
        orientation === 'horizontal' && 'px-6 md:px-12'
      )}
    >
      <div className='absolute left-0 top-0 select-none size-full blur-2xl opacity-75'>
        <img src={image} alt='album' className='object-fill size-full' />
      </div>

      <div className='flex items-center justify-center size-full'>{children}</div>

      <Logo domain link={false} className='text-lg absolute bottom-4 right-4' />
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
            orientation === 'horizontal' && 'flex-row'
          )}
        >
          <div
            className={cn(
              'border border-border flex items-center justify-center rounded-2xl select-none',
              orientation === 'horizontal' && 'size-16'
            )}
          >
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
              orientation === 'horizontal' &&
              'pe-2 py-1 ps-0 justify-center w-min grow h-full items-between'
            )}
          >
            <div className='grid gap-1'>
              <h2 className='flex gap-1.5'>
                <Disc3 color='white' className='flex text-text-primary items-center justify-center' size={16} />

                <span className='text-lg flex-1 grow font-bold leading-none break-words text-ellipsis'>
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
