import type { ReactNode } from 'react'
import './InputArea.css'

interface InputAreaProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  maxLength?: number
  minRows?: number
  children?: ReactNode
}

export const InputArea = ({
  label,
  value,
  onChange,
  placeholder = 'Enter your input here...',
  error,
  maxLength,
  minRows = 6,
  children,
}: InputAreaProps) => {
  return (
    <div className="input-area">
      {label && <label className="input-label">{label}</label>}
      <textarea
        className={`input-textarea ${error ? 'error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={minRows}
        spellCheck="false"
      />
      {maxLength && (
        <div className="input-count">
          {value.length} / {maxLength}
        </div>
      )}
      {error && <div className="input-error">{error}</div>}
      {children}
    </div>
  )
}
