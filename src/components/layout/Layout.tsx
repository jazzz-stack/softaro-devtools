import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      {children}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Softaro DevTools. All rights reserved.</p>
          <p className="footer-note">All data processing happens in your browser. Your data is never sent to our servers.</p>
        </div>
      </footer>
    </div>
  )
}
