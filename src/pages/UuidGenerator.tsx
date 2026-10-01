import { useEffect } from 'react'
import { ToolLayout } from '../components/common/ToolLayout'
import { setMetaTags } from '../utils/meta'

export const UuidGenerator = () => {
  useEffect(() => {
    setMetaTags({
      title: 'UUID Generator | Softaro DevTools',
      description: 'Generate UUID v4 identifiers. Create single or multiple UUIDs. Download as text file.',
      keywords: 'UUID generator, generate UUID, UUID v4, unique identifier generator',
      ogTitle: 'UUID Generator',
      ogDescription: 'Generate unique identifiers',
      ogType: 'website',
      ogUrl: 'https://tools.softarolabs.com/uuid-generator',
      twitterTitle: 'UUID Generator',
      twitterDescription: 'Generate UUID identifiers instantly',
    })
  }, [])

  return (
    <ToolLayout 
      title="UUID Generator"
      description="Generate unique identifiers"
    >
      <p>Coming soon...</p>
    </ToolLayout>
  )
}
