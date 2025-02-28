import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import SchoolCard from '../components/SchoolCard'
import Layout from '../components/Layout'

const Home = () => {
  const router = useRouter();
  const [displayText, setDisplayText] = useState('');
  
  // Enhanced typing animation
  useEffect(() => {
    const phrases = [
      'rated 5-stars by students...',
      'with world-class instruction...',
      'offering top-rated kids classes...',
      'with championship-level training...',
      'featuring elite competition teams...',
      'known for technical excellence...',
      'with highly experienced coaches...',
      'recommended by top athletes...',
      'with award-winning programs...',
      'offering premium facilities...',
      'with state-of-the-art training areas...',
      'specializing in no-gi excellence...',
      'featuring modern training methods...',
      'with dedicated competition classes...',
      'providing professional instruction...'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80; // ms per character when typing
    let deletingSpeed = 80; // Even slower deletion for smoother animation
    let pauseEnd = 1500; // pause when phrase is fully typed
    let pauseStart = 500; // pause when phrase is deleted before typing next
    
    const typeEffect = () => {
      // Current phrase
      const currentPhrase = phrases[phraseIndex % phrases.length];
      
      // Set display text based on current state
      if (isDeleting) {
        // Deleting characters - do one at a time with consistent speed
        setDisplayText(prev => prev.substring(0, prev.length - 1));
        charIndex--;
      } else {
        // Adding characters
        setDisplayText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
      }
      
      // Determine typing speed and next state
      let timeout = isDeleting ? deletingSpeed : typingSpeed;
      
      // State transitions
      if (!isDeleting && charIndex === currentPhrase.length) {
        // Finished typing current phrase - pause before deleting
        timeout = pauseEnd;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting - move to next phrase and pause before typing
        isDeleting = false;
        phraseIndex++;
        timeout = pauseStart;
      }
      
      // Schedule next update
      setTimeout(typeEffect, timeout);
    };
    
    // Start the typing effect
    setTimeout(typeEffect, 1000);
    
    // No cleanup needed for this effect as it should continue running
  }, []);
  
  return (
    <Layout>
      <Head>
        <title>Jiujitsu School Finder | Find Your Perfect BJJ Academy</title>
        <meta name="description" content="Find the best Brazilian Jiujitsu schools and academies near you with our comprehensive database and filters." />
        <style jsx global>{`
          :root {
            --primary: #4F46E5;
            --primary-dark: #4338CA;
            --secondary: #EC4899;
            --text: #1F2937;
            --background: #FFFFFF;
            --gray-light: #F9FAFB;
            --gray-medium: #F3F4F6;
            --gray-dark: #E5E7EB;
          }
        
          #hero {
            margin-top: 0;
            padding-top: 100px;
            min-height: 80vh;
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)),
                      url('/images/hero-bg.jpg') center/cover no-repeat;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: white;
          }
          
          #hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            max-width: 800px;
          }
          
          #hero p {
            font-size: 1.5rem;
            max-width: 600px;
            margin-bottom: 2.5rem;
          }
          
          #changing-text {
            color: var(--secondary);
            position: relative;
            display: inline-block;
            min-width: 10px;
          }
          
          #changing-text::after {
            content: '|';
            margin-left: 3px;
            animation: blink 1s step-end infinite;
          }
          
          @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
          }
          
          .search-container {
            display: flex;
            max-width: 600px;
            width: 100%;
          }
          
          #location-input {
            flex: 1;
            padding: 1rem 1.5rem;
            font-size: 1rem;
            border-radius: 0.5rem 0 0 0.5rem;
            border: none;
            outline: none;
          }
          
          #search-btn {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 1rem 2rem;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 0 0.5rem 0.5rem 0;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          
          #search-btn:hover {
            background-color: var(--primary-dark);
          }
        `}</style>
      </Head>

      <div className="home-container">
        <section id="hero">
          <h1>Find Your Perfect Jiujitsu School</h1>
          <p>
            Find local Jiujitsu academies <span id="changing-text">{displayText}</span>
          </p>
          <div className="search-container">
            <input type="text" id="location-input" placeholder="Enter your location..." />
            <button id="search-btn">Search</button>
          </div>
        </section>

        <section id="browse-section" className="browse-section">
          <div className="container">
            <div className="browse-tiles">
              <Link href="/schools?filter=categories" className="browse-tile">
                <div className="tile-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
                    <path d="M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c0-17.7 14.3-32 32-32H96V224 64zm448 0v32 96h32c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"/>
                  </svg>
                </div>
                <h2>Browse by Categories</h2>
                <p>Find schools by training style and features</p>
              </Link>
              <Link href="/states" className="browse-tile">
                <div className="tile-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
                    <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"/>
                  </svg>
                </div>
                <h2>Browse by States</h2>
                <p>Find schools in your state</p>
              </Link>
              <Link href="/popular" className="browse-tile">
                <div className="tile-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                  </svg>
                </div>
                <h2>Popular Cities</h2>
                <p>Discover top Jiujitsu destinations</p>
              </Link>
            </div>
          </div>
        </section>

        <section id="featured-schools">
          <div className="section-header">
            <h2>Featured Schools</h2>
            <p>Discover highly rated academies near you</p>
          </div>
          <div className="schools-grid">
            <article className="school-card">
              <div className="school-card-image">
                <img src="/images/school1.jpg" alt="Elite BJJ Academy" />
                <div className="school-categories">
                  <span className="category">Gi</span>
                  <span className="category">No-Gi</span>
                  <span className="category">Competition</span>
                </div>
                <div className="school-rating">
                  <span>4.8</span>
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
              </div>
              <div className="school-card-content">
                <h3>Elite BJJ Academy</h3>
                <p className="school-location"><i className="fas fa-map-marker-alt"></i> San Francisco, CA</p>
                <p className="school-description">Elite BJJ Academy offers world-class instruction for all levels, with dedicated competition training and a supportive community.</p>
                <div className="school-card-footer">
                  <Link href="/schools/1" className="view-details-btn">View Details</Link>
                </div>
              </div>
            </article>
            
            {/* Additional school cards would be added here */}
          </div>
          <div className="view-all-container">
            <Link href="/schools" className="view-all-btn">View All Schools <i className="fas fa-arrow-right"></i></Link>
          </div>
        </section>

        <section id="blog">
          <div className="section-header">
            <h2>Latest from Our Blog</h2>
            <p>Insights, tips, and stories from the Jiujitsu world</p>
          </div>
          <div className="blog-grid">
            <article className="blog-card">
              <div className="blog-image">
                <img src="/images/blog1.jpg" alt="Getting Started with BJJ" />
              </div>
              <div className="blog-content">
                <span className="blog-category">Beginners</span>
                <h3 className="blog-title">Getting Started with BJJ: A Complete Guide for Newcomers</h3>
                <p className="blog-excerpt">Learn everything you need to know before your first class, from what to wear to basic etiquette and what to expect.</p>
                <div className="blog-footer">
                  <div className="blog-author">
                    <img src="https://i.pravatar.cc/150?img=68" alt="Author" className="author-avatar" />
                    <div className="author-info">
                      <span className="author-name">Sarah Johnson</span>
                      <span className="blog-date">Mar 12, 2025</span>
                    </div>
                  </div>
                  <a href="#" className="read-more">Read More <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </article>
            
            <article className="blog-card">
              <div className="blog-image">
                <img src="/images/blog2.jpg" alt="Competition Training" />
              </div>
              <div className="blog-content">
                <span className="blog-category">Competition</span>
                <h3 className="blog-title">Competition Training: Mental Preparation for BJJ Tournaments</h3>
                <p className="blog-excerpt">Discover proven mental strategies to overcome anxiety, build confidence, and perform at your peak during competitions.</p>
                <div className="blog-footer">
                  <div className="blog-author">
                    <img src="https://i.pravatar.cc/150?img=12" alt="Author" className="author-avatar" />
                    <div className="author-info">
                      <span className="author-name">Michael Torres</span>
                      <span className="blog-date">Feb 28, 2025</span>
                    </div>
                  </div>
                  <a href="#" className="read-more">Read More <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </article>
            
            <article className="blog-card">
              <div className="blog-image">
                <img src="/images/blog3.jpg" alt="Building a Supportive Community" />
              </div>
              <div className="blog-content">
                <span className="blog-category">Community</span>
                <h3 className="blog-title">Building a Supportive Jiujitsu Training Community</h3>
                <p className="blog-excerpt">Discover how to create and nurture a positive training environment that helps everyone grow in their jiujitsu journey.</p>
                <div className="blog-footer">
                  <div className="blog-author">
                    <img src="https://i.pravatar.cc/150?img=3" alt="Author" className="author-avatar" />
                    <div className="author-info">
                      <span className="author-name">David Chen</span>
                      <span className="blog-date">Feb 15, 2025</span>
                    </div>
                  </div>
                  <a href="#" className="read-more">Read More <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="schools-list">
          {/* School cards will be dynamically added here */}
        </section>
      </div>
    </Layout>
  );
};

export default Home;
