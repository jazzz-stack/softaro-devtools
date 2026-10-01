import { useEffect } from 'react'
import { ToolLayout } from '../components/common/ToolLayout'
import { setMetaTags } from '../utils/meta'

export const UrlEncoder = () => {
  useEffect(() => {
    setMetaTags({
      title: 'URL Encoder & Decoder | Softaro DevTools',
      description: 'Encode and decode URLs and URL components. Support for URI encoding and decoding.',
      keywords: 'URL encoder, URL decoder, encode URL, decode URL, URI encoder, URL percent encoding',
      ogTitle: 'URL Encoder & Decoder',
      ogDescription: 'Encode and decode URLs and URL components',
      ogType: 'website',
      ogUrl: 'https://tools.softarolabs.com/url-encoder',
      twitterTitle: 'URL Encoder & Decoder',
      twitterDescription: 'Encode and decode URLs instantly',
    })
  }, [])

  return (
    <ToolLayout 
      title="URL Encoder / Decoder"
      description="Encode and decode URLs and URL components"
    >
      <p>Coming soon...</p>
    </ToolLayout>
  )
}
