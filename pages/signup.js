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
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Sign Up | BJJ School Finder</title>
        <meta name="description" content="Create an account on BJJ School Finder to list and manage your BJJ school." />
        <style jsx global>{`
          body {
            background-color: #f3f4f6;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .form-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 450px;
            margin: 2rem auto;
            padding: 2rem;
          }
          .form-title {
            font-size: 1.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 1.5rem;
            color: #111827;
          }
          .form-group {
            margin-bottom: 1.25rem;
          }
          .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #4b5563;
          }
          .form-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            font-size: 1rem;
          }
          .form-input:focus {
            outline: none;
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
          }
          .form-hint {
            font-size: 0.75rem;
            color: #6b7280;
            margin-top: 0.25rem;
          }
          .btn-primary {
            display: block;
            width: 100%;
            padding: 0.75rem 1rem;
            background-color: #4f46e5;
            color: white;
            border: none;
            border-radius: 0.375rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.15s ease-in-out;
          }
          .btn-primary:hover {
            background-color: #4338ca;
          }
          .btn-primary:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          .error-message {
            background-color: #fee2e2;
            border-left: 4px solid #ef4444;
            padding: 1rem;
            margin-bottom: 1.25rem;
            color: #b91c1c;
            border-radius: 0.25rem;
          }
          .success-message {
            background-color: #d1fae5;
            border-left: 4px solid #10b981;
            padding: 1.5rem;
            margin-bottom: 1.25rem;
            color: #065f46;
            border-radius: 0.25rem;
            text-align: center;
          }
          .login-link {
            margin-top: 1.5rem;
            text-align: center;
            font-size: 0.875rem;
            color: #6b7280;
          }
          .login-link a {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
          }
          .login-link a:hover {
            text-decoration: underline;
          }
          .terms-text {
            font-size: 0.75rem;
            color: #6b7280;
            text-align: center;
            margin-top: 1rem;
          }
          .terms-text a {
            color: #4f46e5;
            text-decoration: none;
          }
          .terms-text a:hover {
            text-decoration: underline;
          }
        `}</style>
      </Head>
      
      <header style={{ textAlign: 'center', padding: '1rem', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#4f46e5', fontWeight: 'bold', fontSize: '1.5rem' }}>
          BJJ School Finder
        </Link>
      </header>
      
      <main style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 1rem' }}>
        <div className="form-container">
          <h1 className="form-title">Create your account</h1>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {success ? (
            <div className="success-message">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Registration Successful!</h2>
              <p style={{ marginBottom: '1.5rem' }}>Please check your email for a confirmation link to verify your account.</p>
              <Link href="/login" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '0.5rem 1.5rem' }}>
                Go to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="••••••••"
                />
                <p className="form-hint">Must be at least 8 characters long</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              
              <div className="terms-text">
                By signing up, you agree to our{' '}
                <Link href="/terms">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy">Privacy Policy</Link>
              </div>
            </form>
          )}
          
          <div className="login-link">
            Already have an account?{' '}
            <Link href="/login">Sign in</Link>
          </div>
        </div>
      </main>
      
      <footer style={{ textAlign: 'center', padding: '1rem', marginTop: 'auto', color: '#6b7280', fontSize: '0.875rem' }}>
        {new Date().getFullYear()} Jiujitsu School Finder. All rights reserved.
      </footer>
    </div>
  )
}

// Add a custom getLayout function to avoid using the default layout
Signup.getLayout = function getLayout(page) {
  return page;
};
