import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const router = useRouter()
  const { signIn } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
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
      setError(null)
      setLoading(true)
      
      const { email, password } = formData
      const { error } = await signIn(email, password)
      
      if (error) throw error
      
      // Redirect to dashboard or previous page
      const redirectTo = router.query.redirectTo || '/dashboard'
      router.push(redirectTo)
    } catch (error) {
      console.error('Login error:', error)
      setError(error.message || 'Failed to sign in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="auth-container">
      <Head>
        <title>Login | BJJ School Finder</title>
        <meta name="description" content="Log in to your BJJ School Finder account to manage your school listing." />
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
          
          /* Links */
          .auth-forgot {
            display: block;
            text-align: right;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            margin-bottom: 1.5rem;
          }
          
          .auth-forgot a {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
          }
          
          .auth-forgot a:hover {
            text-decoration: underline;
          }
          
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
          <h1 className="auth-title">Sign in to your account</h1>
          
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
          
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
              <div className="auth-forgot">
                <Link href="/forgot-password">Forgot your password?</Link>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="auth-button"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          
          <div className="auth-link">
            Don't have an account?{' '}
            <Link href="/signup">Sign up now</Link>
          </div>
        </div>
      </main>
      
      <footer className="auth-footer">
        &copy; {new Date().getFullYear()} Jiujitsu School Finder. All rights reserved.
      </footer>
    </div>
  )
}

// Add a custom getLayout function to avoid using the default layout
Login.getLayout = function getLayout(page) {
  return page;
};
