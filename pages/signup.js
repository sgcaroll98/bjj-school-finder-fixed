import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const router = useRouter()
  const { signUp } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Reset states
      setError(null)
      setLoading(true)
      
      const { email, password, confirmPassword } = formData
      
      // Validate passwords match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }
      
      // Validate password strength
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long')
      }
      
      // Sign up with Supabase
      const { error } = await signUp(email, password)
      
      if (error) throw error
      
      // Show success message
      setSuccess(true)
    } catch (error) {
      console.error('Signup error:', error)
      setError(error.message || 'Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="auth-container">
      <Head>
        <title>Sign Up | BJJ School Finder</title>
        <meta name="description" content="Create an account on BJJ School Finder to list and manage your BJJ school." />
        <style>{`
          /* Reset and base styles */
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            min-height: 100vh;
          }
          
          /* Auth container */
          .auth-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          /* Header */
          .auth-header {
            background-color: white;
            padding: 1rem 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
          }
          
          .auth-logo {
            color: #4f46e5;
            font-weight: bold;
            font-size: 1.5rem;
            text-decoration: none;
          }
          
          /* Main content */
          .auth-main {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem;
          }
          
          /* Form container */
          .auth-form-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 450px;
            padding: 2rem;
          }
          
          .auth-title {
            font-size: 1.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 1.5rem;
            color: #333;
          }
          
          /* Form group */
          .auth-form-group {
            margin-bottom: 1.25rem;
          }
          
          .auth-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #555;
          }
          
          .auth-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
          }
          
          .auth-input:focus {
            outline: none;
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
          }
          
          .auth-hint {
            font-size: 0.75rem;
            color: #777;
            margin-top: 0.25rem;
          }
          
          /* Button */
          .auth-button {
            display: block;
            width: 100%;
            padding: 0.75rem 1rem;
            background-color: #4f46e5;
            color: white;
            border: none;
            border-radius: 4px;
            font-weight: 500;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.15s ease-in-out;
          }
          
          .auth-button:hover {
            background-color: #4338ca;
          }
          
          .auth-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          
          /* Messages */
          .auth-error {
            background-color: #fee2e2;
            border-left: 4px solid #ef4444;
            padding: 1rem;
            margin-bottom: 1.25rem;
            color: #b91c1c;
            border-radius: 4px;
          }
          
          .auth-success {
            background-color: #d1fae5;
            border-left: 4px solid #10b981;
            padding: 1.5rem;
            margin-bottom: 1.25rem;
            color: #065f46;
            border-radius: 4px;
            text-align: center;
          }
          
          /* Links */
          .auth-link {
            margin-top: 1.5rem;
            text-align: center;
            font-size: 0.875rem;
            color: #666;
          }
          
          .auth-link a {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
          }
          
          .auth-link a:hover {
            text-decoration: underline;
          }
          
          /* Terms */
          .auth-terms {
            font-size: 0.75rem;
            color: #666;
            text-align: center;
            margin-top: 1rem;
          }
          
          .auth-terms a {
            color: #4f46e5;
            text-decoration: none;
          }
          
          .auth-terms a:hover {
            text-decoration: underline;
          }
          
          /* Footer */
          .auth-footer {
            text-align: center;
            padding: 1rem;
            color: #666;
            font-size: 0.875rem;
            background-color: white;
            border-top: 1px solid #eee;
          }
        `}</style>
      </Head>
      
      <header className="auth-header">
        <Link href="/" className="auth-logo">
          BJJ School Finder
        </Link>
      </header>
      
      <main className="auth-main">
        <div className="auth-form-container">
          <h1 className="auth-title">Create your account</h1>
          
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
          
          {success ? (
            <div className="auth-success">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Registration Successful!</h2>
              <p style={{ marginBottom: '1.5rem' }}>Please check your email for a confirmation link to verify your account.</p>
              <Link href="/login" className="auth-button" style={{ display: 'inline-block', width: 'auto', padding: '0.5rem 1.5rem' }}>
                Go to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label htmlFor="email" className="auth-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="auth-input"
                  placeholder="you@example.com"
                />
              </div>
              
              <div className="auth-form-group">
                <label htmlFor="password" className="auth-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="auth-input"
                  placeholder="••••••••"
                />
                <p className="auth-hint">Must be at least 8 characters long</p>
              </div>
              
              <div className="auth-form-group">
                <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="auth-input"
                  placeholder="••••••••"
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="auth-button"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              
              <div className="auth-terms">
                By signing up, you agree to our{' '}
                <Link href="/terms">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy">Privacy Policy</Link>
              </div>
            </form>
          )}
          
          <div className="auth-link">
            Already have an account?{' '}
            <Link href="/login">Sign in</Link>
          </div>
        </div>
      </main>
      
      <footer className="auth-footer">
        {new Date().getFullYear()} Jiujitsu School Finder. All rights reserved.
      </footer>
    </div>
  )
}

// Add a custom getLayout function to avoid using the default layout
Signup.getLayout = function getLayout(page) {
  return page;
};
