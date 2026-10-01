import type { ReactNode } from 'react'
import './Card.css'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  as?: 'div' | 'article' | 'section'
}

export const Card = ({
  children,
  className = '',
  onClick,
  as: Component = 'div',
}: CardProps) => {
  return (
    <Component
      className={`card ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {children}
    </Component>
  )
}
