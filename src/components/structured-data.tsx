import Script from 'next/script'
import { jsonLdWebsite, jsonLdService } from '@/lib/seo'

const StructuredData = () => {
  return (
    <>
      <Script
        id="json-ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdWebsite),
        }}
      />
      <Script
        id="json-ld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdService),
        }}
      />
    </>
  )
}

export default StructuredData