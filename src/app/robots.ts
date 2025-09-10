import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://whycrew.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/submissions/',
        '/.env*',
        '/api/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}