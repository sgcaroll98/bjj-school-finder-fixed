import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

export default function Layout({ title, keywords, description, children }) {
  const { user } = useAuth()
  
  return (
    <>
      <Head>
        <title>{title || 'BJJ School Finder'}</title>
        <meta name="description" content={description || 'Find the perfect Brazilian Jiujitsu school near you'} />
        <meta name="keywords" content={keywords || 'bjj, jiujitsu, schools, academies, training'} />
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
          <div className="footer-section about">
            <h3>About Us</h3>
            <p>BJJ School Finder helps practitioners find the perfect Brazilian Jiujitsu academy that matches their training goals and preferences.</p>
          </div>
          
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/schools">Find Schools</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p><i className="fas fa-envelope"></i> info@bjjschoolfinder.com</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BJJ School Finder. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
