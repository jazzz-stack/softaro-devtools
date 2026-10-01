import { useEffect, useState } from 'react'
import { ToolLayout } from '../../components/common/ToolLayout'
import { InputArea } from '../../components/common/InputArea'
import { OutputArea } from '../../components/common/OutputArea'
import { Button } from '../../components/common/Button'
import { setMetaTags } from '../../utils/meta'
import { copyToClipboard } from '../../utils/clipboard'
import { downloadFile } from '../../utils/download'
import { minifyJSON, getCompressionStats, validateJSON } from '../../tools/json/formatter'
import './JsonMinifier.css'

export const JsonMinifier = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<{
    originalSize: number
    minifiedSize: number
    saved: number
    percentage: number
  } | null>(null)

  useEffect(() => {
    setMetaTags({
      title: 'JSON Minifier | Softaro DevTools',
      description: 'Minify JSON to reduce file size and bandwidth. See compression percentage and size reduction.',
      keywords: 'JSON minifier, minify JSON, compress JSON, reduce JSON size',
      ogTitle: 'JSON Minifier',
      ogDescription: 'Minify JSON to reduce file size',
      ogType: 'website',
      ogUrl: 'https://tools.softarolabs.com/json-minifier',
      twitterTitle: 'JSON Minifier',
      twitterDescription: 'Minify JSON to reduce file size',
    })
  }, [])

  const handleMinify = () => {
    setLoading(true)
    setError('')

    const validation = validateJSON(input)
    if (!validation.isValid) {
      setError(validation.error || 'Invalid JSON')
      setOutput('')
      setStats(null)
      setLoading(false)
      return
    }

    const result = minifyJSON(input)
    if (result.success && result.output) {
      setOutput(result.output)
      const compression = getCompressionStats(input, result.output)
      setStats(compression)
      setError('')
    } else {
      setError(result.error || 'Failed to minify JSON')
      setOutput('')
      setStats(null)
    }
    setLoading(false)
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(output)
    if (success) {
      alert('Copied to clipboard!')
    } else {
      alert('Failed to copy')
    }
  }

  const handleDownload = () => {
    downloadFile(output, 'minified.json', 'application/json')
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
    setStats(null)
  }

  return (
    <ToolLayout 
      title="JSON Minifier"
      description="Minify JSON to reduce file size and bandwidth"
    >
      <div className="minifier-container">
        <div className="minifier-controls">
          <Button 
            variant="primary" 
            onClick={handleMinify} 
            disabled={!input.trim()}
            size="lg"
          >
            Minify JSON
          </Button>
        </div>

        <div className="minifier-grid">
          <InputArea
            label="Input JSON"
            value={input}
            onChange={setInput}
            placeholder="Paste your JSON here..."
            error={error}
          />
          <OutputArea
            label="Output (Minified)"
            value={output}
            loading={loading}
            error={error ? error : undefined}
            copyable={!!output && !error}
            onCopy={handleCopy}
          />
        </div>

        {stats && !error && (
          <div className="stats-box">
            <div className="stat-item">
              <div className="stat-label">Original Size</div>
              <div className="stat-value">{(stats.originalSize / 1024).toFixed(2)} KB</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Minified Size</div>
              <div className="stat-value">{(stats.minifiedSize / 1024).toFixed(2)} KB</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Size Reduction</div>
              <div className="stat-value success">
                {(stats.saved / 1024).toFixed(2)} KB ({stats.percentage}%)
              </div>
            </div>
          </div>
        )}

        <div className="action-buttons">
          {output && !error && (
            <>
              <Button variant="success" onClick={handleDownload}>
                Download JSON
              </Button>
              <Button variant="secondary" onClick={handleClear}>
                Clear All
              </Button>
            </>
          )}
        </div>

        <div className="info-box">
          <h3>Your data stays in your browser</h3>
          <p>All minification happens locally. No data is sent to any server.</p>
        </div>
      </div>
    </ToolLayout>
  )
}
