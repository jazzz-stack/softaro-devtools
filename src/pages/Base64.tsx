import { useEffect } from 'react'
import { ToolLayout } from '../components/common/ToolLayout'
import { setMetaTags } from '../utils/meta'

export const Base64 = () => {
  useEffect(() => {
    setMetaTags({
      title: 'Base64 Encoder & Decoder | Softaro DevTools',
      description: 'Encode and decode Base64 strings. Support for Unicode and text conversion.',
      keywords: 'Base64 encoder, Base64 decoder, encode Base64, decode Base64, base64 converter',
      ogTitle: 'Base64 Encoder & Decoder',
      ogDescription: 'Encode and decode text using Base64',
      ogType: 'website',
      ogUrl: 'https://tools.softarolabs.com/base64',
      twitterTitle: 'Base64 Encoder & Decoder',
      twitterDescription: 'Encode and decode Base64 strings',
    })
  }, [])

  return (
    <ToolLayout 
      title="Base64 Encoder / Decoder"
      description="Encode and decode text using Base64"
    >
      <p>Coming soon...</p>
    </ToolLayout>
  )
}
