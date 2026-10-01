import { Link } from 'react-router-dom'
import './Header.css'

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="logo-text">Softaro DevTools</span>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
        </nav>
      </div>
    </header>
  )
}
