import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

export default function Layout({ children }) {
  const { user } = useAuth()
  
  return (
    <>
      <Head>
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
            <h3>Jiujitsu School Finder</h3>
            <p>Find the best Brazilian Jiujitsu schools near you. Search, compare, and connect with Jiujitsu academies.</p>
            <div className="footer-social">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/schools">Find Schools</Link></li>
              <li><Link href="/add-school">Add Your School</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li><i className="fas fa-envelope"></i> info@jiujitsuschools.com</li>
              <li><i className="fas fa-phone"></i> (123) 456-7890</li>
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
