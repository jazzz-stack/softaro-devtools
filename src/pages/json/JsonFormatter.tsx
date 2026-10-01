import { useEffect, useState } from 'react'
import { ToolLayout } from '../../components/common/ToolLayout'
import { InputArea } from '../../components/common/InputArea'
import { OutputArea } from '../../components/common/OutputArea'
import { Button } from '../../components/common/Button'
import { setMetaTags } from '../../utils/meta'
import { copyToClipboard } from '../../utils/clipboard'
import { downloadFile } from '../../utils/download'
import { formatJSON, minifyJSON, validateJSON } from '../../tools/json/formatter'
import './JsonFormatter.css'

type IndentationType = 2 | 4 | 'tab'

export const JsonFormatter = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indentation, setIndentation] = useState<IndentationType>(2)
  const [isFormatted, setIsFormatted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMetaTags({
      title: 'JSON Formatter & Validator | Softaro DevTools',
      description: 'Format, validate, and minify JSON with configurable indentation. Pretty print JSON and detect errors.',
      keywords: 'JSON formatter, JSON validator, format JSON, minify JSON, pretty print JSON',
      ogTitle: 'JSON Formatter & Validator',
      ogDescription: 'Format and validate JSON with pretty printing',
      ogType: 'website',
      ogUrl: 'https://tools.softarolabs.com/json-formatter',
      twitterTitle: 'JSON Formatter & Validator',
      twitterDescription: 'Format, validate, and minify JSON',
    })
  }, [])

  const handleFormat = () => {
    setLoading(true)
    setError('')
    
    const validation = validateJSON(input)
    if (!validation.isValid) {
      setError(validation.error || 'Invalid JSON')
      setOutput('')
      setIsFormatted(false)
      setLoading(false)
      return
    }

    const result = formatJSON(input, indentation)
    if (result.success && result.output) {
      setOutput(result.output)
      setIsFormatted(true)
      setError('')
    } else {
      setError(result.error || 'Failed to format JSON')
      setOutput('')
      setIsFormatted(false)
    }
    setLoading(false)
  }

  const handleMinify = () => {
    setLoading(true)
    setError('')
    
    const result = minifyJSON(input)
    if (result.success && result.output) {
      setOutput(result.output)
      setIsFormatted(true)
      setError('')
    } else {
      setError(result.error || 'Failed to minify JSON')
      setOutput('')
      setIsFormatted(false)
    }
    setLoading(false)
  }

  const handleValidate = () => {
    setLoading(true)
    const validation = validateJSON(input)
    if (validation.isValid) {
      setError('')
      setOutput('✓ Valid JSON')
      setIsFormatted(true)
    } else {
      setError(validation.error || 'Invalid JSON')
      setOutput('')
      setIsFormatted(false)
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
    downloadFile(output, 'formatted.json', 'application/json')
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
    setIsFormatted(false)
  }

  return (
    <ToolLayout 
      title="JSON Formatter & Validator"
      description="Format, validate, and minify JSON with configurable indentation"
    >
      <div className="json-formatter-container">
        <div className="formatter-controls">
          <div className="control-group">
            <label htmlFor="indentation-select">Indentation:</label>
            <select
              id="indentation-select"
              value={indentation}
              onChange={(e) => setIndentation(e.target.value as IndentationType)}
              className="indentation-select"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
              <option value="tab">Tabs</option>
            </select>
          </div>
          <div className="button-group">
            <Button variant="primary" onClick={handleFormat} disabled={!input.trim()}>
              Format
            </Button>
            <Button variant="secondary" onClick={handleMinify} disabled={!input.trim()}>
              Minify
            </Button>
            <Button variant="secondary" onClick={handleValidate} disabled={!input.trim()}>
              Validate
            </Button>
          </div>
        </div>

        <div className="formatter-grid">
          <InputArea
            label="Input JSON"
            value={input}
            onChange={setInput}
            placeholder="Paste your JSON here..."
            error={error}
          />
          <OutputArea
            label="Output"
            value={output}
            loading={loading}
            error={error ? error : undefined}
            copyable={isFormatted && !error}
            onCopy={handleCopy}
          />
        </div>

        <div className="action-buttons">
          {isFormatted && !error && (
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
          <p>All formatting and validation happens locally. No data is sent to any server.</p>
        </div>
      </div>
    </ToolLayout>
  )
}
