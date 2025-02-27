import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'

export default function DashboardNav() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  
  const isActive = (path) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`)
  }
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                School Dashboard
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-4 md:items-center">
              <Link 
                href="/dashboard" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/dashboard') && !isActive('/dashboard/add-school') && !isActive('/dashboard/upgrade')
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                My Schools
              </Link>
              
              <Link 
                href="/dashboard/add-school" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/dashboard/add-school') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Add School
              </Link>
              
              <Link 
                href="/dashboard/upgrade" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/dashboard/upgrade') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Upgrade Plan
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-700">
                    {user?.email}
                  </span>
                  
                  <button
                    onClick={handleSignOut}
                    className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/dashboard" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/dashboard') && !isActive('/dashboard/add-school') && !isActive('/dashboard/upgrade')
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            My Schools
          </Link>
          
          <Link 
            href="/dashboard/add-school" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/dashboard/add-school') 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Add School
          </Link>
          
          <Link 
            href="/dashboard/upgrade" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/dashboard/upgrade') 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Upgrade Plan
          </Link>
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="px-2 space-y-1">
            <div className="block px-3 py-2 text-base font-medium text-gray-700">
              {user?.email}
            </div>
            
            <button
              onClick={() => {
                handleSignOut()
                setIsMenuOpen(false)
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
