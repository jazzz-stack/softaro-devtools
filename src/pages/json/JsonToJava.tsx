import { useEffect, useState } from 'react'
import { ToolLayout } from '../../components/common/ToolLayout'
import { InputArea } from '../../components/common/InputArea'
import { OutputArea } from '../../components/common/OutputArea'
import { Button } from '../../components/common/Button'
import { setMetaTags } from '../../utils/meta'
import { copyToClipboard } from '../../utils/clipboard'
import { downloadFile } from '../../utils/download'
import { validateJSON } from '../../tools/json/formatter'
import { jsonToJava } from '../../tools/json/toJava'
import './JsonToJava.css'

export const JsonToJava = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [className, setClassName] = useState('Model')
  const [useLombok, setUseLombok] = useState(false)
  const [useJackson, setUseJackson] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMetaTags({
      title: 'JSON to Java Model Generator | Softaro DevTools',
      description: 'Generate Java POJO classes from JSON. Support for Lombok and Jackson annotations.',
      keywords: 'JSON to Java, Java model generator, POJO generator, JSON to Java class',
      ogTitle: 'JSON to Java Model Generator',
      ogDescription: 'Generate Java model classes from JSON',
      ogType: 'website',
      ogUrl: 'https://tools.softarolabs.com/json-to-java',
      twitterTitle: 'JSON to Java Model Generator',
      twitterDescription: 'Generate Java classes from JSON',
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

    const result = jsonToJava(input, className || 'Model', {
      useLombok,
      useJackson,
    })
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
    const filename = `${className}.java`
    downloadFile(output, filename, 'text/x-java-source')
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
    setClassName('Model')
    setUseLombok(false)
    setUseJackson(true)
  }

  return (
    <ToolLayout 
      title="JSON → Java"
      description="Generate Java model classes from JSON"
    >
      <div className="java-converter-container">
        <div className="java-converter-controls">
          <div className="control-group">
            <label htmlFor="class-name">Class Name:</label>
            <input
              id="class-name"
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Enter class name"
              className="class-name-input"
            />
          </div>

          <div className="checkboxes-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useLombok}
                onChange={(e) => setUseLombok(e.target.checked)}
              />
              <span>Use Lombok @Data</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useJackson}
                onChange={(e) => setUseJackson(e.target.checked)}
              />
              <span>Use Jackson Annotations</span>
            </label>
          </div>

          <Button 
            variant="primary" 
            onClick={handleConvert} 
            disabled={!input.trim()}
          >
            Generate Java Class
          </Button>
        </div>

        <div className="java-converter-grid">
          <InputArea
            label="Input JSON"
            value={input}
            onChange={setInput}
            placeholder="Paste your JSON object here..."
            error={error}
          />
          <OutputArea
            label="Java Class"
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
                Download .java File
              </Button>
              <Button variant="secondary" onClick={handleClear}>
                Clear All
              </Button>
            </>
          )}
        </div>

        <div className="info-box">
          <h3>Features</h3>
          <ul>
            <li><strong>Type Inference:</strong> Automatically determines Java types (String, int, long, double, boolean)</li>
            <li><strong>Lombok Support:</strong> Generates @Data annotation for automatic getters/setters</li>
            <li><strong>Jackson Support:</strong> Adds @JsonProperty annotations for property mapping</li>
            <li><strong>camelCase Conversion:</strong> Converts snake_case JSON keys to camelCase field names</li>
            <li><strong>Your data stays in your browser:</strong> All conversion happens locally</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
