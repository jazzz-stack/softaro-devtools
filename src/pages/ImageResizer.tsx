import { useEffect } from 'react'
import { ToolLayout } from '../components/common/ToolLayout'
import { setMetaTags } from '../utils/meta'

export const ImageResizer = () => {
  useEffect(() => {
    setMetaTags({
      title: 'Image Resizer & Compressor | Softaro DevTools',
      description: 'Resize and compress images directly in your browser. Support for JPG, PNG, WebP. No uploads.',
      keywords: 'image resizer, image compressor, resize image, compress image, online image editor',
      ogTitle: 'Image Resizer & Compressor',
      ogDescription: 'Resize and compress images directly in your browser',
      ogType: 'website',
      ogUrl: 'https://tools.softarolabs.com/image-resizer',
      twitterTitle: 'Image Resizer & Compressor',
      twitterDescription: 'Resize and compress images online',
    })
  }, [])

  return (
    <ToolLayout 
      title="Image Resizer & Compressor"
      description="Resize and compress images directly in your browser"
    >
      <p>Coming soon...</p>
    </ToolLayout>
  )
}
