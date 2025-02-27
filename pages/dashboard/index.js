import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabaseClient'
import DashboardNav from '../../components/DashboardNav'

export default function Dashboard() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirectTo=/dashboard')
    }
  }, [user, authLoading, router])
  
  // Fetch user's schools
  useEffect(() => {
    if (user) {
      fetchUserSchools()
    }
  }, [user])
  
  async function fetchUserSchools() {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('owner_id', user.id)
      
      if (error) throw error
      
      setSchools(data || [])
    } catch (error) {
      console.error('Error fetching schools:', error)
      setError('Failed to load your schools. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  // If still checking auth state, show loading
  if (authLoading) {
    return <div className="text-center py-16">Loading...</div>
  }
  
  // If not logged in (and being redirected), show loading
  if (!user) {
    return <div className="text-center py-16">Redirecting to login...</div>
  }
  
  return (
    <>
      <Head>
        <title>Dashboard | BJJ School Finder</title>
        <meta name="description" content="Manage your BJJ schools and listings." />
      </Head>
      
      <DashboardNav />
      
      <section className="dashboard-header bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">School Dashboard</h1>
              <p className="text-gray-600">Manage your BJJ school listings</p>
            </div>
            
            <Link href="/dashboard/add-school" className="mt-4 md:mt-0 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
              Add New School
            </Link>
          </div>
        </div>
      </section>
      
      <section className="dashboard-content py-8">
        <div className="container mx-auto px-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-8">Loading your schools...</div>
          ) : schools.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        School Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {schools.map((school) => (
                      <tr key={school.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{school.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{school.city}, {school.state}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              school.plan === 'premium' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : school.plan === 'basic'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}>
                              {school.plan ? school.plan.charAt(0).toUpperCase() + school.plan.slice(1) : 'Free'}
                            </span>
                            {(school.plan === 'free' || school.plan === 'basic') && (
                              <Link href={`/dashboard/upgrade?school=${school.id}`} className="ml-2 text-xs text-blue-600 hover:text-blue-800">
                                Upgrade
                              </Link>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            school.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : school.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {school.status ? school.status.charAt(0).toUpperCase() + school.status.slice(1) : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <Link href={`/dashboard/schools/${school.id}`} className="text-blue-600 hover:text-blue-900">
                              <i className="fas fa-edit mr-1"></i> Edit
                            </Link>
                            <Link href={`/schools/${school.id}`} className="text-green-600 hover:text-green-900">
                              <i className="fas fa-eye mr-1"></i> View
                            </Link>
                            <button 
                              className="text-red-600 hover:text-red-900"
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${school.name}? This action cannot be undone.`)) {
                                  // Add delete functionality here
                                  console.log('Delete school:', school.id)
                                }
                              }}
                            >
                              <i className="fas fa-trash-alt mr-1"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-bold mb-4">You don't have any schools yet</h2>
              <p className="text-gray-600 mb-6">Get started by adding your first BJJ school to our directory.</p>
              <Link href="/dashboard/add-school" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                Add Your First School
              </Link>
            </div>
          )}
        </div>
      </section>
      
      <section className="dashboard-help bg-gray-50 py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              If you need assistance with managing your school listings or have any questions, 
              our support team is here to help.
            </p>
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
