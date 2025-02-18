'use client'

import type React from 'react'
import { useState } from 'react'

import { Player, PlayerBackground } from '@/components/money/player'
import { Heading } from '@/components/heading'
import { Button } from '@/components/button'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/input'
import { Music } from 'lucide-react'
import { Fetch } from '@/lib/fetch'

import type { Song } from '@/types/song'

export const ClientHomePage: React.FC = (): React.ReactNode => {
  const t = useTranslations('home')

  const [url, setUrl] = useState<string>('')

  const [song, setSong] = useState<Song | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false)
  const submit = () => {

const regex = /\/(track|album)\/([a-zA-Z0-9]+)/
const match = url.match(regex)
const id = match?.[2] ?? ''


    setMessage(t('loading'))

    const fetch = async () => {
      const response = await Fetch.post<{
        message: string
        data: Song
      }>('/api/song', {
        id
      })

      const json = await response.json()
      if (response.status === 200) {
        setSong(json.data)
        setMessage(null)
        setError(false)
      } else {
        setMessage(json.message)
        setError(true)
      }
    }

    fetch()
  }

  return (
    <>
      <div className='grid gap-4 w-full'>
        <div className='grid gap-2 w-full'>
          <Input
            type='url'
            icon={<Music size={16} />}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='Spotify URL'
          />

          <Button onClick={submit}>
            {t('submit')}
          </Button>
        </div>

        {song && (
          <div className='flex justify-center w-full mx-auto'>
            <div className='p-2 bg-black'>
              <PlayerBackground image={song.image}>
                <Player
                  title={song.title}
                  artist={song.artist}
                  image={song.image}
                  orientation='vertical'
                />
              </PlayerBackground>
            </div>
          </div>
        )}

        {message && (
          <div className='w-full justify-center'>
            {error && <h1 className='text-2xl font-bold text-center'>{t('error')}</h1>}
            <h1 className='text-xl font-medium text-center'>{message}</h1>
          </div>
        )}
      </div>

      <div>
        <Heading>{t('usage')}</Heading>

        <div className='grid gap-4'>
          <div>
            <h2 className='text-xl font-medium'>{t('desktop')}</h2>
            <p className='text-text-tertiary'>{t('desktop-usage')}</p>
          </div>

          <div>
            <h2 className='text-xl font-medium'>{t('mobile')}</h2>
            <p className='text-text-tertiary'>{t('mobile-usage')}</p>
          </div>
        </div>
      </div>
    </>
  )
}
