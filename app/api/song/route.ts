import type { Song } from '@/types/song'
import { type NextRequest, NextResponse } from 'next/server'

const getSpotifyAccessToken = async (): Promise<string> => {
  const clientID = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientID || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify Client ID, Client Secret, or Refresh Token')
  }

  const body = new URLSearchParams()
  body.append('grant_type', 'refresh_token')
  body.append('refresh_token', refreshToken)

  const basic = Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  })

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()
  return json.access_token
}

export const POST = async (request: NextRequest) => {
  try {
    const referer = request.headers.get('referer')
    if (!referer || !referer.startsWith(process.env.APP_URL || '')) {
      return NextResponse.json({ message: 'Forbidden', data: null }, { status: 403 })
    }

    const { id } = await request.json()
    if (!id) {
      throw new Error('No id provided')
    }

    const songResponse = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${await getSpotifyAccessToken()}`
      }
    })
    const albumResponse = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${await getSpotifyAccessToken()}`
      }
    })

    if (!(songResponse.status === 200) && !(albumResponse.status === 200)) {
      return NextResponse.json({ message: 'Error', data: null })
    }

    const album = await albumResponse.json()
    const song = await songResponse.json()

    return NextResponse.json({
      message: '',
      data: {
        title: song?.name ?? album?.name,
        artist: (song?.artists ?? album?.artists)?.map((artist: any) => artist.name).join(', '),
        image: (song?.album ?? album)?.images[0]?.url
      } satisfies Song
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to get song details',
        details: (error as Error).message,
        data: null
      },
      { status: 500 }
    )
  }
}
