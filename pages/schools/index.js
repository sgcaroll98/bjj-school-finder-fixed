import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Layout from '../../components/Layout'

export default function Schools() {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('rating')
  const [filters, setFilters] = useState({
    gi: false,
    nogi: false,
    mma: false,
    beginners: false,
    kids: false,
    competition: false,
    women: false,
    showers: false,
    weights: false,
    lockers: false,
    sauna: false,
    morning: false,
    afternoon: false,
    evening: false,
    weekend: false
  })

  useEffect(() => {
    fetchSchools()
  }, [filters, sortBy])

  async function fetchSchools() {
    try {
      setLoading(true)
      
      // Start building the query
      let query = supabase.from('schools').select('*')
      
      // Apply filters (simplified for demo - actual filtering would be more complex)
      if (filters.gi) query = query.eq('has_gi', true)
      if (filters.nogi) query = query.eq('has_nogi', true)
      if (filters.kids) query = query.eq('has_kids', true)
      if (filters.competition) query = query.eq('has_comp', true)
      if (filters.women) query = query.eq('has_women', true)
      if (filters.showers) query = query.eq('has_showers', true)
      if (filters.weights) query = query.eq('has_weights', true)
      if (filters.lockers) query = query.eq('has_lockers', true)
      if (filters.sauna) query = query.eq('has_sauna', true)
      
      // Execute the query
      const { data, error } = await query
      
      if (error) throw error
      
      // Sort data
      let sortedData = [...(data || [])]
      if (sortBy === 'rating') {
        sortedData.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      } else if (sortBy === 'reviews') {
        sortedData.sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0))
      } else if (sortBy === 'price') {
        sortedData.sort((a, b) => (a.price_level || 0) - (b.price_level || 0))
      }
      
      setSchools(sortedData)
    } catch (error) {
      console.error('Error fetching schools:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleFilterChange(e) {
    const { name, checked } = e.target
    setFilters(prev => ({ ...prev, [name]: checked }))
  }

  function applyFilters() {
    fetchSchools()
  }

  function clearFilters() {
    setFilters({
      gi: false,
      nogi: false,
      mma: false,
      beginners: false,
      kids: false,
      competition: false,
      women: false,
      showers: false,
      weights: false,
      lockers: false,
      sauna: false,
      morning: false,
      afternoon: false,
      evening: false,
      weekend: false
    })
  }

  return (
    <Layout>
      <Head>
        <title>Find Schools | Jiujitsu School Finder</title>
        <meta name="description" content="Sort and filter Brazilian Jiujitsu schools based on what matters most to you" />
      </Head>

      <section 
        className="sort-header" 
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container">
          <div className="section-header text-center">
            <h1>Find Your Perfect School Match</h1>
            <p>Sort and filter schools based on what matters most to you</p>
          </div>
        </div>
      </section>

      <section className="sort-content">
        <div className="container">
          <div className="sort-layout">
            {/* Filter Sidebar */}
            <aside className="filters-sidebar">
              <div className="filter-group">
                <h3>Training Style</h3>
                <div className="filter-options">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="gi" 
                      checked={filters.gi}
                      onChange={handleFilterChange}
                    /> 
                    Gi Training
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="nogi" 
                      checked={filters.nogi}
                      onChange={handleFilterChange}
                    /> 
                    No-Gi Training
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="mma" 
                      checked={filters.mma}
                      onChange={handleFilterChange}
                    /> 
                    MMA
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <h3>Programs</h3>
                <div className="filter-options">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="beginners" 
                      checked={filters.beginners}
                      onChange={handleFilterChange}
                    /> 
                    Beginners Classes
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="kids" 
                      checked={filters.kids}
                      onChange={handleFilterChange}
                    /> 
                    Kids Program
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="competition" 
                      checked={filters.competition}
                      onChange={handleFilterChange}
                    /> 
                    Competition Training
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="women" 
                      checked={filters.women}
                      onChange={handleFilterChange}
                    /> 
                    Women's Classes
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <h3>Amenities</h3>
                <div className="filter-options">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="showers" 
                      checked={filters.showers}
                      onChange={handleFilterChange}
                    /> 
                    Showers
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="weights" 
                      checked={filters.weights}
                      onChange={handleFilterChange}
                    /> 
                    Weight Room
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="lockers" 
                      checked={filters.lockers}
                      onChange={handleFilterChange}
                    /> 
                    Lockers
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="sauna" 
                      checked={filters.sauna}
                      onChange={handleFilterChange}
                    /> 
                    Sauna
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <h3>Schedule</h3>
                <div className="filter-options">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="morning" 
                      checked={filters.morning}
                      onChange={handleFilterChange}
                    /> 
                    Morning Classes
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="afternoon" 
                      checked={filters.afternoon}
                      onChange={handleFilterChange}
                    /> 
                    Afternoon Classes
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="evening" 
                      checked={filters.evening}
                      onChange={handleFilterChange}
                    /> 
                    Evening Classes
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="weekend" 
                      checked={filters.weekend}
                      onChange={handleFilterChange}
                    /> 
                    Weekend Classes
                  </label>
                </div>
              </div>

              <div className="filter-actions">
                <button className="apply-filters-btn" onClick={applyFilters}>Apply Filters</button>
                <button className="clear-filters-btn" style={{ marginLeft: '10px' }} onClick={clearFilters}>Clear All</button>
              </div>
            </aside>

            {/* Results Area */}
            <div className="results-area">
              <div className="results-header">
                <div className="results-count">
                  <span>{schools.length} schools found</span>
                </div>
                <div className="sort-options">
                  <label htmlFor="sort-select">Sort by:</label>
                  <select 
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="rating">Rating</option>
                    <option value="reviews">Number of Reviews</option>
                    <option value="price">Price: Low to High</option>
                  </select>
                </div>
              </div>

              <div className="school-listings">
                {loading ? (
                  <div className="loading-indicator">Loading schools...</div>
                ) : schools.length > 0 ? (
                  schools.map(school => (
                    <div key={school.id} className="school-card">
                      <div className="school-card-image">
                        <img src={school.image_url || "/images/placeholder-school.jpg"} alt={school.name} />
                      </div>
                      <div className="school-card-content">
                        <h3 className="school-name">{school.name}</h3>
                        <div className="school-rating">
                          {/* Star rating would go here */}
                          <span>★★★★☆</span>
                          <span className="reviews-count">({school.reviews_count || 0})</span>
                          <span className="price">{school.price_level === 1 ? '$' : school.price_level === 2 ? '$$' : '$$$'}</span>
                        </div>
                        <p className="school-address">{school.address}, {school.city}, {school.state}</p>
                        <div className="school-features">
                          {school.has_gi && <span className="feature">Gi Training</span>}
                          {school.has_nogi && <span className="feature">No-Gi</span>}
                          {school.has_kids && <span className="feature">Kids Program</span>}
                          {school.has_beginners && <span className="feature">Beginners</span>}
                        </div>
                        <Link href={`/schools/${school.id}`} className="view-details-btn">View Details</Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <p>No schools found matching your criteria.</p>
                    <p>Try adjusting your filters or <Link href="/add-school">add a school</Link>.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Map Container - Placeholder for now */}
            <div className="map-container">
              <div className="map-placeholder">
                <p>Map view coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
