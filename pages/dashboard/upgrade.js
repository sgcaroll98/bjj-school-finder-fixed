import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabaseClient'
import DashboardNav from '../../components/DashboardNav'

export default function UpgradePlan() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [schools, setSchools] = useState([])
  const [selectedSchool, setSelectedSchool] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: '', content: '' })
  
  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirectTo=/dashboard/upgrade')
    } else if (user) {
      fetchUserSchools()
    }
  }, [user, authLoading, router])
  
  // Handle school ID from query parameter
  useEffect(() => {
    if (router.isReady && router.query.school && schools.length > 0) {
      const schoolId = router.query.school
      const school = schools.find(s => s.id === schoolId)
      if (school) {
        setSelectedSchool(school)
      }
    }
  }, [router.isReady, router.query.school, schools])
  
  // Fetch schools owned by the user
  async function fetchUserSchools() {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('schools')
        .select('id, name, plan')
        .eq('owner_id', user.id)
      
      if (error) {
        throw error
      }
      
      if (data) {
        setSchools(data)
        // If there's only one school, select it automatically
        if (data.length === 1) {
          setSelectedSchool(data[0])
        }
      }
    } catch (error) {
      console.error('Error fetching schools:', error)
      setMessage({ type: 'error', content: 'Failed to load your schools. Please try again.' })
    } finally {
      setLoading(false)
    }
  }
  
  // Handle plan upgrade
  async function upgradeToPlan(plan) {
    if (!selectedSchool) {
      setMessage({ type: 'error', content: 'Please select a school to upgrade.' })
      return
    }
    
    try {
      setLoading(true)
      
      // Update the school's plan in Supabase
      const { error } = await supabase
        .from('schools')
        .update({ plan: plan })
        .eq('id', selectedSchool.id)
      
      if (error) {
        throw error
      }
      
      // Update local state
      setSelectedSchool({ ...selectedSchool, plan: plan })
      setMessage({ 
        type: 'success', 
        content: `Successfully upgraded ${selectedSchool.name} to ${plan} plan!` 
      })
      
      // Update the schools list
      setSchools(schools.map(school => 
        school.id === selectedSchool.id ? { ...school, plan: plan } : school
      ))
      
    } catch (error) {
      console.error('Error upgrading plan:', error)
      setMessage({ type: 'error', content: 'Failed to upgrade plan. Please try again.' })
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
        <title>Upgrade Plan | BJJ School Finder</title>
        <meta name="description" content="Upgrade your BJJ School Finder subscription plan." />
      </Head>
      
      <DashboardNav />
      
      <section className="dashboard-header bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Upgrade Your Plan</h1>
              <p className="text-gray-600">Choose the right plan for your school</p>
            </div>
            
            <Link href="/dashboard" className="mt-4 md:mt-0 bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
      
      {/* School Selection */}
      {schools.length > 1 && (
        <section className="school-selection py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-4">Select a School to Upgrade</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label htmlFor="school-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose School:
                </label>
                <select 
                  id="school-select"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedSchool ? selectedSchool.id : ''}
                  onChange={(e) => {
                    const schoolId = e.target.value
                    const school = schools.find(s => s.id === schoolId)
                    setSelectedSchool(school || null)
                  }}
                >
                  <option value="">-- Select a school --</option>
                  {schools.map(school => (
                    <option key={school.id} value={school.id}>
                      {school.name} {school.plan !== 'free' ? `(${school.plan})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Status Message */}
      {message.content && (
        <div className={`container mx-auto px-4 py-4 ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          <div className="max-w-3xl mx-auto px-4 py-2 rounded-md">
            {message.content}
          </div>
        </div>
      )}
      
      <section className="pricing-section py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Subscription Plan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the plan that best fits your needs. Upgrade anytime to get more features and visibility for your BJJ school.
            </p>
            {selectedSchool && (
              <div className="mt-4 font-medium">
                Currently upgrading: <span className="font-bold">{selectedSchool.name}</span>
                {selectedSchool.plan !== 'free' && (
                  <span className="ml-2">
                    (Current plan: <span className="capitalize">{selectedSchool.plan}</span>)
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Free</h3>
                <p className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-600 font-normal">/month</span></p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic school information</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Contact details</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Training options</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <svg className="h-6 w-6 text-gray-300 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Photo gallery</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <svg className="h-6 w-6 text-gray-300 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Class schedule</span>
                  </li>
                </ul>
                
                <button 
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
                  onClick={() => upgradeToPlan('free')}
                  disabled={!selectedSchool || selectedSchool.plan === 'free' || loading}
                >
                  {!selectedSchool ? 'Select a School' : selectedSchool.plan === 'free' ? 'Current Plan' : 'Downgrade to Free'}
                </button>
              </div>
            </div>
            
            {/* Basic Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-200 transform scale-105">
              <div className="bg-blue-600 text-white text-center py-2">
                <span className="text-sm font-medium">MOST POPULAR</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Basic</h3>
                <p className="text-4xl font-bold mb-6">$19.99<span className="text-lg text-gray-600 font-normal">/month</span></p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All Free features</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Photo gallery (up to 10 photos)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Class schedule</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Instructor profiles</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <svg className="h-6 w-6 text-gray-300 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Featured placement</span>
                  </li>
                </ul>
                
                <button 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  onClick={() => upgradeToPlan('basic')}
                  disabled={!selectedSchool || selectedSchool.plan === 'basic' || loading}
                >
                  {!selectedSchool ? 'Select a School' : selectedSchool.plan === 'basic' ? 'Current Plan' : 'Upgrade to Basic'}
                </button>
                <p className="text-center text-sm text-gray-500 mt-2">14-day free trial</p>
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Premium</h3>
                <p className="text-4xl font-bold mb-6">$39.99<span className="text-lg text-gray-600 font-normal">/month</span></p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All Basic features</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Featured placement</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Promotional banner</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Student testimonials</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Social media integration</span>
                  </li>
                </ul>
                
                <button 
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
                  onClick={() => upgradeToPlan('premium')}
                  disabled={!selectedSchool || selectedSchool.plan === 'premium' || loading}
                >
                  {!selectedSchool ? 'Select a School' : selectedSchool.plan === 'premium' ? 'Current Plan' : 'Upgrade to Premium'}
                </button>
                <p className="text-center text-sm text-gray-500 mt-2">14-day free trial</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">Need help choosing?</h3>
            <p className="text-gray-600 mb-6">
              Contact our team for personalized assistance in selecting the right plan for your school.
            </p>
            <Link href="/contact" className="inline-block bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300">
              Contact Support
            </Link>
          </div>
          
          {/* Feature Comparison Table */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Feature Comparison</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Feature</th>
                    <th className="py-3 px-6 text-center text-sm font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Free</th>
                    <th className="py-3 px-6 text-center text-sm font-medium text-blue-600 uppercase tracking-wider border-b border-gray-200">Basic</th>
                    <th className="py-3 px-6 text-center text-sm font-medium text-yellow-600 uppercase tracking-wider border-b border-gray-200">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">Basic School Information</td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">Contact Details</td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">Training Options</td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">Photo Gallery</td>
                    <td className="py-3 px-6 text-center"><span className="text-red-500">✗</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span> <span className="text-xs text-gray-500">(10 photos)</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span> <span className="text-xs text-gray-500">(Unlimited)</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">Class Schedule</td>
                    <td className="py-3 px-6 text-center"><span className="text-red-500">✗</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">Instructor Profiles</td>
                    <td className="py-3 px-6 text-center"><span className="text-red-500">✗</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">Featured Placement</td>
                    <td className="py-3 px-6 text-center"><span className="text-red-500">✗</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-red-500">✗</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">Promotional Banner</td>
                    <td className="py-3 px-6 text-center"><span className="text-red-500">✗</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-red-500">✗</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">Student Testimonials</td>
                    <td className="py-3 px-6 text-center"><span className="text-red-500">✗</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-red-500">✗</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">Social Media Integration</td>
                    <td className="py-3 px-6 text-center"><span className="text-red-500">✗</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-red-500">✗</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">Search Result Priority</td>
                    <td className="py-3 px-6 text-center"><span className="text-xs text-gray-500">Low</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-xs text-gray-500">Medium</span></td>
                    <td className="py-3 px-6 text-center"><span className="text-xs text-gray-500">High</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
