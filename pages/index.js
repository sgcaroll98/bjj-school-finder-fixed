import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import SchoolCard from '../components/SchoolCard'

export default function Home() {
  const [featuredSchools, setFeaturedSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [changingText, setChangingText] = useState('near you')

  useEffect(() => {
    // Fetch featured schools from Supabase
    async function fetchFeaturedSchools() {
      try {
        setLoading(true)
        
        // Get 6 random schools to feature
        const { data, error } = await supabase
          .from('schools')
          .select('*')
          .limit(6)
        
        if (error) {
          throw error
        }
        
        if (data) {
          setFeaturedSchools(data)
        }
      } catch (error) {
        console.error('Error fetching schools:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchFeaturedSchools()

    // Set up the changing text animation
    const texts = ['near you', 'for all levels', 'with top instructors', 'for competition'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setChangingText(texts[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [])

  return (
    <div>
      <Head>
        <title>Jiujitsu School Finder - Find Your Perfect Brazilian Jiujitsu School</title>
        <meta name="description" content="Find the best Brazilian Jiujitsu schools near you. Search, compare, and connect with Jiujitsu academies." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section id="hero">
        <h1>Find Your Perfect Jiujitsu School</h1>
        <p><span className="animated-text-line">Find local Jiujitsu academies <span id="changing-text">{changingText}</span></span></p>
        <div className="search-container">
          <input type="text" id="location-input" placeholder="Enter your location..." />
          <button id="search-btn">Search</button>
        </div>
      </section>

      <section id="browse-section" className="browse-section">
        <div className="container">
          <div className="browse-tiles">
            <Link href="/sort" className="browse-tile">
              <i className="fas fa-dumbbell"></i>
              <h2>Browse by Categories</h2>
              <p>Find schools by training style and features</p>
            </Link>
            <Link href="/states" className="browse-tile">
              <i className="fas fa-city"></i>
              <h2>Browse by States</h2>
              <p>Explore schools in your area</p>
            </Link>
            <Link href="/popular" className="browse-tile">
              <i className="fas fa-star"></i>
              <h2>Popular Cities</h2>
              <p>Discover top Jiujitsu destinations</p>
            </Link>
          </div>
        </div>
      </section>
      
      <section id="featured-gyms" className="featured-gyms-section">
        <div className="container text-center">
          <div className="section-header text-center">
            <h2>Explore Top Rated Gyms</h2>
            <p>Featured schools in your area</p>
          </div>
          
          {loading ? (
            <div className="text-center py-8">Loading schools...</div>
          ) : (
            <div className="featured-gyms-grid">
              {featuredSchools.length > 0 ? (
                featuredSchools.map(school => (
                  <SchoolCard key={school.id} school={school} featured={true} />
                ))
              ) : (
                // Placeholder cards if no schools are found
                Array(6).fill().map((_, i) => (
                  <div key={i} className="featured-gym-card">
                    <div className="featured-badge">
                      <i className="fas fa-crown"></i> Featured
                    </div>
                    <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#f3f4f6' }}>
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-500">Image placeholder</span>
                      </div>
                    </div>
                    <div className="gym-info">
                      <div className="gym-header">
                        <h3>Example BJJ Academy {i+1}</h3>
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <span>4.8</span>
                        </div>
                      </div>
                      <p className="gym-location">
                        <i className="fas fa-map-marker-alt"></i> New York, NY
                      </p>
                      <div className="gym-features">
                        <span className="feature"><i className="fas fa-user-ninja"></i> Gi</span>
                        <span className="feature"><i className="fas fa-running"></i> No Gi</span>
                        <span className="feature"><i className="fas fa-child"></i> Kids</span>
                      </div>
                      <Link href="/schools/example" className="view-gym-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/schools" className="view-gym-btn inline-block px-8 py-3">
              View All Schools
            </Link>
          </div>
        </div>
      </section>

      <section id="blog-posts" className="blog-posts-section">
        <div className="container text-center">
          <div className="section-header text-center">
            <h2>Latest from Our Blog</h2>
            <p>Stay updated with Jiujitsu news, tips, and community highlights</p>
          </div>
          
          <div className="blog-grid">
            <div className="blog-card" data-category="Technique">
              <div className="blog-image">
                <div className="blog-category">Technique</div>
                <img src="/images/blog-placeholder-1.jpg" alt="BJJ Technique" />
              </div>
              <div className="blog-content">
                <h3>5 Essential Submissions Every White Belt Should Know</h3>
                <p className="blog-meta">June 15, 2023 • 5 min read</p>
                <p className="blog-excerpt">Master these fundamental submissions to build a solid foundation for your Jiujitsu journey.</p>
                <Link href="/blog/submissions" className="read-more">Read More</Link>
              </div>
            </div>
            
            <div className="blog-card" data-category="Training">
              <div className="blog-image">
                <div className="blog-category">Training</div>
                <img src="/images/blog-placeholder-2.jpg" alt="BJJ Training" />
              </div>
              <div className="blog-content">
                <h3>How to Balance BJJ Training with a Full-Time Job</h3>
                <p className="blog-meta">May 28, 2023 • 4 min read</p>
                <p className="blog-excerpt">Practical tips for maintaining consistent training while managing work responsibilities.</p>
                <Link href="/blog/balance" className="read-more">Read More</Link>
              </div>
            </div>
            
            <div className="blog-card" data-category="Community">
              <div className="blog-image">
                <div className="blog-category">Community</div>
                <img src="/images/blog-placeholder-3.jpg" alt="BJJ Community" />
              </div>
              <div className="blog-content">
                <h3>The Growing Women's BJJ Movement: Progress and Challenges</h3>
                <p className="blog-meta">May 10, 2023 • 6 min read</p>
                <p className="blog-excerpt">Exploring the rise of women's participation in Brazilian Jiujitsu and the road ahead.</p>
                <Link href="/blog/women-bjj" className="read-more">Read More</Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog" className="view-all-btn">
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
