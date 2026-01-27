import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export function generateSEO({
  title = 'WhyCrew - Elite Staff Offshoring for Fortune 500',
  description = 'World-class cybersecurity and AI development talent for mission-critical projects. Expert staff offshoring with unmatched expertise and reliability.',
  keywords = 'staff offshoring, cybersecurity, AI development, Fortune 500, enterprise development, security experts',
  image = '/og-image.jpg',
  url = '/',
  type = 'website'
}: SEOProps = {}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://whycrew.com'
  
  return {
    title,
    description,
    keywords,
    authors: [{ name: 'WhyCrew' }],
    creator: 'WhyCrew',
    publisher: 'WhyCrew',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'WhyCrew',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'WhyCrew',
  description: 'Leading cybersecurity and AI development company specializing in mission-critical enterprise platforms and threat detection systems.',
  url: process.env.NEXT_PUBLIC_URL || 'https://whycrew.com',
  logo: `${process.env.NEXT_PUBLIC_URL || 'https://whycrew.com'}/logo.jpeg`,
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@whycrew.com',
    contactType: 'customer service',
    areaServed: 'Global',
    availableLanguage: ['en']
  },
  sameAs: [
    'https://linkedin.com/company/whycrew',
    'https://twitter.com/whycrew',
    'https://github.com/whycrew'
  ],
  foundingDate: '2020',
  numberOfEmployees: '50-100',
  industry: 'Computer Security, Artificial Intelligence',
  slogan: 'Cybersecurity & AI Development Experts'
}

export const jsonLdService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Cybersecurity & AI Development Services',
  description: 'Enterprise cybersecurity platform development, AI-powered threat detection, and mission-critical security solutions.',
  provider: {
    '@type': 'Organization',
    name: 'WhyCrew',
    url: process.env.NEXT_PUBLIC_URL || 'https://whycrew.com'
  },
  serviceType: 'Software Development',
  category: ['Cybersecurity', 'Artificial Intelligence', 'Enterprise Software'],
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Enterprise Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cybersecurity Platform Development',
          description: 'SIEM development, threat intelligence platforms, security orchestration, and compliance solutions'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI-Powered Security Solutions',
          description: 'Machine learning threat detection, behavioral analysis, and automated incident response systems'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Enterprise Application Development',
          description: 'High-performance trading platforms, cloud security, and mission-critical enterprise applications'
        }
      }
    ]
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47'
  }
}