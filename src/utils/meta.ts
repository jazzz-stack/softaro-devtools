/**
 * Utility to manage page meta tags for SEO
 */
export interface MetaTags {
  title: string
  description: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogType?: string
  ogUrl?: string
  twitterTitle?: string
  twitterDescription?: string
}

export const setMetaTags = (tags: MetaTags): void => {
  // Set page title
  document.title = tags.title

  // Set or update meta description
  let descriptionMeta = document.querySelector('meta[name="description"]')
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta')
    descriptionMeta.setAttribute('name', 'description')
    document.head.appendChild(descriptionMeta)
  }
  descriptionMeta.setAttribute('content', tags.description)

  // Set keywords if provided
  if (tags.keywords) {
    let keywordsMeta = document.querySelector('meta[name="keywords"]')
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta')
      keywordsMeta.setAttribute('name', 'keywords')
      document.head.appendChild(keywordsMeta)
    }
    keywordsMeta.setAttribute('content', tags.keywords)
  }

  // Set Open Graph tags
  const setOGTag = (property: string, content: string): void => {
    let tag = document.querySelector(`meta[property="${property}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('property', property)
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  }

  if (tags.ogTitle) setOGTag('og:title', tags.ogTitle)
  if (tags.ogDescription) setOGTag('og:description', tags.ogDescription)
  if (tags.ogType) setOGTag('og:type', tags.ogType)
  if (tags.ogUrl) setOGTag('og:url', tags.ogUrl)

  // Set Twitter Card tags
  const setTwitterTag = (name: string, content: string): void => {
    let tag = document.querySelector(`meta[name="${name}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', name)
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  }

  if (tags.twitterTitle) setTwitterTag('twitter:title', tags.twitterTitle)
  if (tags.twitterDescription) setTwitterTag('twitter:description', tags.twitterDescription)

  // Scroll to top
  window.scrollTo(0, 0)
}
