import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/common/Card'
import { setMetaTags } from '../utils/meta'
import './Home.css'

const TOOLS_BY_CATEGORY = {
  'JSON Tools': [
    { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON with pretty printing' },
    { id: 'json-minifier', name: 'JSON Minifier', description: 'Minify JSON to reduce file size' },
    { id: 'json-to-typescript', name: 'JSON → TypeScript', description: 'Convert JSON to TypeScript interfaces' },
    { id: 'json-to-java', name: 'JSON → Java', description: 'Convert JSON to Java model classes' },
  ],
  'Encoding & Security': [
    { id: 'base64', name: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings' },
    { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode and inspect JWT tokens' },
    { id: 'url-encoder', name: 'URL Encoder/Decoder', description: 'Encode and decode URLs' },
  ],
  'Testing & Utilities': [
    { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate unique identifiers' },
    { id: 'regex-tester', name: 'Regex Tester', description: 'Test and debug regular expressions' },
  ],
  'Image Tools': [
    { id: 'image-resizer', name: 'Image Resizer', description: 'Resize and compress images' },
  ],
}

export const Home = () => {
  useEffect(() => {
    setMetaTags({
      title: 'Softaro DevTools - Developer Utilities',
      description: 'Fast, privacy-focused developer tools that run in your browser. JSON formatter, Base64 encoder, JWT decoder, UUID generator, and more.',
      keywords: 'developer tools, online tools, JSON formatter, Base64 encoder, JWT decoder, regex tester, UUID generator',
      ogTitle: 'Softaro DevTools',
      ogDescription: 'Developer tools that run in your browser',
      ogType: 'website',
      ogUrl: 'https://tools.softarolabs.com/',
      twitterTitle: 'Softaro DevTools',
      twitterDescription: 'Fast developer utilities in your browser',
    })
  }, [])

  return (
    <div className="home">
      <section className="tools-section">
        <div className="container">
          {Object.entries(TOOLS_BY_CATEGORY).map(([category, tools]) => (
            <div key={category} className="category">
              <h2>{category}</h2>
              <div className="tools-grid">
                {tools.map((tool) => (
                  <Link key={tool.id} to={`/${tool.id}`} className="tool-link">
                    <Card as="article">
                      <h3>{tool.name}</h3>
                      <p>{tool.description}</p>
                      <div className="tool-action">
                        Open Tool →
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
