import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

export default function Layout({ title, keywords, description, children }) {
  const { user } = useAuth()
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      </Head>
      
      <header>
        <nav>
          <div className="logo">Jiujitsu School Finder</div>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/schools">Schools</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            {user ? (
              <Link href="/dashboard" className="auth-button">Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="auth-button login">Login</Link>
                <Link href="/signup" className="auth-button signup">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div className="footer-section main-footer">
            <h3>Jiujitsu School Finder</h3>
            <p>Find your perfect BJJ academy and start your journey today.</p>
          </div>
          
          <div className="footer-section">
            <h4>For School Owners</h4>
            <ul>
              <li><Link href="/claim">Claim Your School</Link></li>
              <li><Link href="/advertise">Advertise With Us</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Jiujitsu School Finder. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
