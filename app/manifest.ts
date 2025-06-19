import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dubbby - AI Video Dubbing Platform',
    short_name: 'Dubbby',
    description: 'Transform your videos with AI-powered dubbing and perfect lip synchronization. Translate content into 15+ languages in 30 seconds.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3B82F6',
    orientation: 'portrait',
    scope: '/',
    categories: ['productivity', 'video', 'ai', 'entertainment'],
    lang: 'en',
    dir: 'ltr',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      }
    ],
    shortcuts: [
      {
        name: 'Upload Video',
        short_name: 'Upload',
        description: 'Upload a new video for dubbing',
        url: '/dashboard/videos',
        icons: [{ src: '/favicon-192x192.png', sizes: '192x192' }]
      },
      {
        name: 'Join Waitlist',
        short_name: 'Waitlist',
        description: 'Join the waitlist for early access',
        url: '/waitlist',
        icons: [{ src: '/favicon-192x192.png', sizes: '192x192' }]
      }
    ]
  }
} 