import type { ReactNode } from 'react'
import './ToolLayout.css'

interface ToolLayoutProps {
  title: string
  description?: string
  children: ReactNode
}

export const ToolLayout = ({ title, description, children }: ToolLayoutProps) => {
  return (
    <div className="tool-layout">
      <div className="tool-header">
        <div>
          <h1>{title}</h1>
          {description && <p className="tool-description">{description}</p>}
        </div>
      </div>
      <div className="tool-container">
        <div className="container">{children}</div>
      </div>
    </div>
  )
}
