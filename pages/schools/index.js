import Head from 'next/head'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import SchoolCard from '../../components/SchoolCard'
import FilterSidebar from '../../components/FilterSidebar'

export default function Schools() {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    state: '',
    hasGi: false,
    hasNogi: false,
    hasKids: false,
    hasComp: false,
    hasWomen: false
  })

  useEffect(() => {
    fetchSchools()
  }, [filters])

  async function fetchSchools() {
    try {
      setLoading(true)
      
      // Start building the query
      let query = supabase.from('schools').select('*')
      
      // Apply filters
      if (filters.state) {
        query = query.eq('state', filters.state)
      }
      
      if (filters.hasGi) {
        query = query.eq('has_gi', true)
      }
      
      if (filters.hasNogi) {
        query = query.eq('has_nogi', true)
      }
      
      if (filters.hasKids) {
        query = query.eq('has_kids', true)
      }
      
      if (filters.hasComp) {
        query = query.eq('has_comp', true)
      }
      
      if (filters.hasWomen) {
        query = query.eq('has_women', true)
      }
      
      // Execute the query
      const { data, error } = await query
      
      if (error) {
        throw error
      }
      
      if (data) {
        setSchools(data)
      }
    } catch (error) {
      console.error('Error fetching schools:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleFilterChange(newFilters) {
    setFilters({ ...filters, ...newFilters })
  }

  return (
    <div>
      <Head>
        <title>Find BJJ Schools | BJJ School Finder</title>
        <meta name="description" content="Browse and search for Brazilian Jiu-Jitsu schools across the country." />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Find BJJ Schools</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </div>
          
          <div className="md:w-3/4">
            {loading ? (
              <div className="text-center py-8">Loading schools...</div>
            ) : schools.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {schools.map(school => (
                  <SchoolCard key={school.id} school={school} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-xl">No schools found matching your criteria.</p>
                <p className="mt-4">Try adjusting your filters or <a href="/add-school" className="text-blue-600 hover:underline">add a school</a>.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
