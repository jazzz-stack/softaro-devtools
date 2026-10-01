import type { ReactNode } from 'react'
import './OutputArea.css'

interface OutputAreaProps {
  label?: string
  value: string
  loading?: boolean
  error?: string
  children?: ReactNode
  copyable?: boolean
  onCopy?: () => void
}

export const OutputArea = ({
  label,
  value,
  loading = false,
  error,
  children,
  copyable = false,
  onCopy,
}: OutputAreaProps) => {
  return (
    <div className="output-area">
      <div className="output-header">
        {label && <label className="output-label">{label}</label>}
        {copyable && (
          <button
            className="output-copy-btn"
            onClick={onCopy}
            aria-label="Copy to clipboard"
            title="Copy to clipboard"
          >
            Copy
          </button>
        )}
      </div>
      <div className={`output-box ${error ? 'error' : ''} ${loading ? 'loading' : ''}`}>
        {loading ? (
          <div className="output-loading">Processing...</div>
        ) : error ? (
          <div className="output-error">{error}</div>
        ) : (
          <pre className="output-content">{value || 'Output will appear here'}</pre>
        )}
      </div>
      {children}
    </div>
  )
}
