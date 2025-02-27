import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import SchoolCard from '../components/SchoolCard'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [changingText, setChangingText] = useState('near you')
  const [typewriterEffect, setTypewriterEffect] = useState(true)

  useEffect(() => {
    setLoading(false)
    
    // Set up the changing text animation with typewriter effect
    const texts = ['near you', 'for all levels', 'with top instructors', 'for competition'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      // Hide text first (simulating deletion)
      setTypewriterEffect(false);
      
      // After a short delay, change text and show it again (simulating typing)
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        setChangingText(texts[currentIndex]);
        setTypewriterEffect(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [])

  return (
    <div>
      <Head>
        <title>Jiujitsu School Finder - Find Your Perfect Brazilian Jiujitsu School</title>
        <meta name="description" content="Find the best Brazilian Jiujitsu schools near you. Search, compare, and connect with Jiujitsu academies." />
        <link rel="icon" href="/favicon.ico" />
        <style jsx>{`
          #hero {
            background-image: url('/images/hero-bg.jpg');
            background-size: cover;
            background-position: center;
            position: relative;
          }
          
          #hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1;
          }
          
          #hero > * {
            position: relative;
            z-index: 2;
          }
          
          .typewriter {
            display: inline-block;
            overflow: hidden;
            animation: typing 3.5s steps(40, end);
          }
          
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
        `}</style>
      </Head>

      <section id="hero">
        <h1>Find Your Perfect Jiujitsu School</h1>
        <p>
          <span className="animated-text-line">
            Find local Jiujitsu academies <span id="changing-text" className={typewriterEffect ? 'typewriter' : ''}>{changingText}</span>
          </span>
        </p>
        <div className="search-container">
          <input type="text" id="location-input" placeholder="Enter your location..." />
          <button id="search-btn">Search</button>
        </div>
      </section>

      <section id="browse-section" className="browse-section">
        <div className="container">
          <div className="browse-tiles">
            <Link href="/schools" className="browse-tile">
              <i className="fas fa-dumbbell"></i>
              <h2>Browse by Categories</h2>
              <p>Find schools by training style and features</p>
            </Link>
            <Link href="/schools" className="browse-tile">
              <i className="fas fa-city"></i>
              <h2>Browse by States</h2>
              <p>Explore schools in your area</p>
            </Link>
            <Link href="/schools" className="browse-tile">
              <i className="fas fa-star"></i>
              <h2>Popular Cities</h2>
              <p>Discover top Jiujitsu destinations</p>
            </Link>
          </div>
        </div>
      </section>
      
      <section id="blog-section" className="blog-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Latest Articles</h2>
            <p>News and resources from the BJJ community</p>
          </div>
          
          <div className="blog-grid">
            <div className="blog-card">
              <div className="blog-image">
                <img src="/images/submission-bg.jpg" alt="BJJ Techniques" />
              </div>
              <div className="blog-content">
                <div className="blog-category">Techniques</div>
                <h3>Essential Submissions for Beginners</h3>
                <p>Learn the fundamental submission techniques that every BJJ practitioner should know.</p>
                <a href="#" className="read-more">Read More</a>
              </div>
            </div>
            
            <div className="blog-card">
              <div className="blog-image">
                <img src="/images/submission-bg.jpg" alt="BJJ Training" />
              </div>
              <div className="blog-content">
                <div className="blog-category">Training</div>
                <h3>How to Choose the Right BJJ School</h3>
                <p>Tips for finding the perfect Brazilian Jiujitsu academy for your training goals.</p>
                <a href="#" className="read-more">Read More</a>
              </div>
            </div>
            
            <div className="blog-card">
              <div className="blog-image">
                <img src="/images/submission-bg.jpg" alt="BJJ Lifestyle" />
              </div>
              <div className="blog-content">
                <div className="blog-category">Lifestyle</div>
                <h3>BJJ and Mental Health: The Hidden Benefits</h3>
                <p>Discover how Brazilian Jiujitsu can improve your mental wellbeing and reduce stress.</p>
                <a href="#" className="read-more">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
