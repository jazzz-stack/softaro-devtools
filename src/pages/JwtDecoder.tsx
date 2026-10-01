import { useEffect } from 'react'
import { ToolLayout } from '../components/common/ToolLayout'
import { setMetaTags } from '../utils/meta'

export const JwtDecoder = () => {
  useEffect(() => {
    setMetaTags({
      title: 'JWT Decoder | Softaro DevTools',
      description: 'Decode and inspect JWT tokens. View header, payload, and signature. No verification (browser-only).',
      keywords: 'JWT decoder, decode JWT, JWT token decoder, JWT parser, JSON Web Token',
      ogTitle: 'JWT Decoder',
      ogDescription: 'Decode and inspect JWT tokens (decoding only, no verification)',
      ogType: 'website',
      ogUrl: 'https://tools.softarolabs.com/jwt-decoder',
      twitterTitle: 'JWT Decoder',
      twitterDescription: 'Decode and inspect JWT tokens securely',
    })
  }, [])

  return (
    <ToolLayout 
      title="JWT Decoder"
      description="Decode and inspect JWT tokens (decoding only, no verification)"
    >
      <p>Coming soon...</p>
    </ToolLayout>
  )
}
