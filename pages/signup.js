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
    <>
      <Head>
        <title>Sign Up | BJJ School Finder</title>
        <meta name="description" content="Create an account on BJJ School Finder to list and manage your BJJ school." />
      </Head>
      
      <section className="auth-section py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              {success ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-6 rounded mb-4 text-center">
                  <h2 className="text-xl font-bold mb-2">Registration Successful!</h2>
                  <p className="mb-4">Please check your email for a confirmation link to verify your account.</p>
                  <Link href="/login" className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                    Go to Login
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">Must be at least 8 characters long</p>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg transition duration-300 font-medium ${
                      loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </button>
                  
                  <p className="text-sm text-center text-gray-500">
                    By signing up, you agree to our{' '}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
