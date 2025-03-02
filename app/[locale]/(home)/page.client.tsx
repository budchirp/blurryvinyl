'use client'

import type React from 'react'
import { useRef, useState } from 'react'

import { Player, PlayerBackground } from '@/components/player'
import { Button } from '@/components/button'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/input'
import slugify from 'slugify'
import { Music } from 'lucide-react'
import { Fetch } from '@/lib/fetch'
import { useScreenshot } from 'use-screenshot-hook'

import type { Song } from '@/types/song'

export const ClientHomePage: React.FC = (): React.ReactNode => {
  const t = useTranslations('home')
  const t_common = useTranslations('common')

  const [url, setUrl] = useState<string>('')
  const [orientation, setOrienation] = useState<'vertical' | 'horizontal'>('vertical')

  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const submit = () => {
    const regex = /\/(track|album)\/([a-zA-Z0-9]+)/
    const match = url.match(regex)
    const id = match?.[2] ?? ''

    setLoading(true)

    const fetch = async () => {
      const response = await Fetch.post<{
        message: string
        data: Song
      }>('/api/song', {
        id
      })

      const json = await response.json()
      if (response.status < 400) {
        setSong(json.data)
        setError(null)

        setTimeout(() => {
          takeScreenshot('jpg')
        }, 1000)
      } else {
        setError(json.message)
      }

      setLoading(false)
    }

    fetch()
  }

  const ref = useRef<HTMLDivElement>(null)
  const { image, takeScreenshot } = useScreenshot({
    ref
  })

  return (
    <>
      <div className='grid gap-4 w-full'>
        <div className='grid gap-2 w-full'>
          <div className='flex w-full justify-center items-center'>
            <div className='border border-border bg-background-tertiary rounded-full flex gap-2 p-2'>
              <Button
                color={orientation === 'vertical' ? 'primary' : 'secondary'}
                onClick={() => setOrienation('vertical')}
              >
                {t('vertical')}
              </Button>

              <Button
                color={orientation === 'horizontal' ? 'primary' : 'secondary'}
                onClick={() => setOrienation('horizontal')}
              >
                {t('horizontal')}
              </Button>
            </div>
          </div>

          <Input
            type='url'
            icon={<Music size={16} />}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='Spotify URL'
          />

          <div>
            <Button loading={loading} onClick={submit}>
              {t_common('submit')}
            </Button>
          </div>
        </div>

        {song && (
          <div className='grid gap-4'>
            <div className='w-full flex justify-center'>
              <div ref={ref} className='bg-black'>
                <PlayerBackground orientation={orientation} image={song.image}>
                  <Player
                    title={song.title}
                    artist={song.artist}
                    image={song.image}
                    orientation={orientation}
                  />
                </PlayerBackground>
              </div>
            </div>

            <div className='flex w-full justify-center'>
              <a download={`${slugify(`${song.title}-${song.artist}`)}.jpg`} href={image}>
                <Button>{t('download')}</Button>
              </a>
            </div>
          </div>
        )}

        {error && (
          <div className='w-full justify-center'>
            <h1 className='text-2xl font-bold text-center'>{t_common('error')}</h1>
            <h2 className='text-xl font-medium text-center'>{error}</h2>
          </div>
        )}
      </div>
    </>
  )
}
