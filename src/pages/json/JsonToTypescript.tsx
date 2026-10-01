import { useEffect, useState } from 'react'
import { ToolLayout } from '../../components/common/ToolLayout'
import { InputArea } from '../../components/common/InputArea'
import { OutputArea } from '../../components/common/OutputArea'
import { Button } from '../../components/common/Button'
import { setMetaTags } from '../../utils/meta'
import { copyToClipboard } from '../../utils/clipboard'
import { downloadFile } from '../../utils/download'
import { validateJSON } from '../../tools/json/formatter'
import { jsonToTypeScript } from '../../tools/json/toTypescript'
import './JsonToTypescript.css'

export const JsonToTypescript = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [interfaceName, setInterfaceName] = useState('Root')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMetaTags({
      title: 'JSON to TypeScript Converter | Softaro DevTools',
      description: 'Convert JSON examples into TypeScript interfaces and types. Support for nested objects and arrays.',
      keywords: 'JSON to TypeScript, convert JSON, TypeScript interface generator, JSON type',
      ogTitle: 'JSON to TypeScript Converter',
      ogDescription: 'Convert JSON examples into TypeScript interfaces',
      ogType: 'website',
      ogUrl: 'https://tools.softarolabs.com/json-to-typescript',
      twitterTitle: 'JSON to TypeScript Converter',
      twitterDescription: 'Convert JSON to TypeScript interfaces',
    })
  }, [])

  const handleConvert = () => {
    setLoading(true)
    setError('')

    const validation = validateJSON(input)
    if (!validation.isValid) {
      setError(validation.error || 'Invalid JSON')
      setOutput('')
      setLoading(false)
      return
    }

    const result = jsonToTypeScript(input, interfaceName || 'Root')
    if (result.success && result.output) {
      setOutput(result.output)
      setError('')
    } else {
      setError(result.error || 'Failed to convert JSON')
      setOutput('')
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
    const filename = `${interfaceName.toLowerCase()}.ts`
    downloadFile(output, filename, 'text/typescript')
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
    setInterfaceName('Root')
  }

  return (
    <ToolLayout 
      title="JSON → TypeScript"
      description="Convert JSON examples into TypeScript interfaces"
    >
      <div className="converter-container">
        <div className="converter-controls">
          <div className="control-group">
            <label htmlFor="interface-name">Interface Name:</label>
            <input
              id="interface-name"
              type="text"
              value={interfaceName}
              onChange={(e) => setInterfaceName(e.target.value)}
              placeholder="Enter interface name"
              className="interface-input"
            />
          </div>
          <Button 
            variant="primary" 
            onClick={handleConvert} 
            disabled={!input.trim()}
          >
            Convert to TypeScript
          </Button>
        </div>

        <div className="converter-grid">
          <InputArea
            label="Input JSON"
            value={input}
            onChange={setInput}
            placeholder="Paste your JSON object here..."
            error={error}
          />
          <OutputArea
            label="TypeScript Interface"
            value={output}
            loading={loading}
            error={error ? error : undefined}
            copyable={!!output && !error}
            onCopy={handleCopy}
          />
        </div>

        <div className="action-buttons">
          {output && !error && (
            <>
              <Button variant="success" onClick={handleDownload}>
                Download .ts File
              </Button>
              <Button variant="secondary" onClick={handleClear}>
                Clear All
              </Button>
            </>
          )}
        </div>

        <div className="info-box">
          <h3>How it works</h3>
          <ul>
            <li>Analyzes your JSON structure and infers TypeScript types</li>
            <li>Handles nested objects and arrays</li>
            <li>Escapes reserved property names automatically</li>
            <li>Your data stays in your browser - no server upload</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
