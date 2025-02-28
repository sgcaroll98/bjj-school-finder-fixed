import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

export default function Layout({ title, keywords, description, children }) {
  const { user } = useAuth()
  
  return (
    <>
      <Head>
        <title>{title || 'Jiujitsu School Finder'}</title>
        <meta name="description" content={description || 'Find the perfect Brazilian Jiujitsu school near you'} />
        <meta name="keywords" content={keywords || 'jiujitsu, schools, academies, training'} />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      </Head>
      
      <header>
        <nav>
          <Link href="/" className="logo">Jiujitsu School Finder</Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/schools">Schools</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="auth-buttons">
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
        <div className="footer-content">
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Jiujitsu School Finder</h3>
            <p>Find your perfect BJJ academy and start your journey today.</p>
          </div>
          
          <div className="footer-column">
            <h3>For School Owners</h3>
            <ul>
              <li><Link href="/claim">Claim Your School</Link></li>
              <li><Link href="/advertise">Advertise With Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          &copy; {new Date().getFullYear()} Jiujitsu School Finder. All rights reserved.
        </div>
      </footer>
    </>
  )
}
