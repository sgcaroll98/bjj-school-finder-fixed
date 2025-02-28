import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import SchoolCard from '../components/SchoolCard'

export default function Home() {
  const router = useRouter();
  const [changingText, setChangingText] = useState('for beginners');
  const textOptions = ['for beginners', 'for advanced training', 'for competition', 'with No-Gi classes', 'with kids programs'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typing animation effect
  useEffect(() => {
    const textToType = textOptions[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(textToType.substring(0, displayText.length + 1));
        
        if (displayText.length === textToType.length) {
          setIsDeleting(true);
          setTypingSpeed(800); // pause before deleting
        }
      } else {
        setDisplayText(textToType.substring(0, displayText.length - 1));
        
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTypingSpeed(150);
          setCurrentTextIndex((currentTextIndex + 1) % textOptions.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, textOptions, typingSpeed]);

  return (
    <div>
      <Head>
        <title>BJJ School Finder | Find Your Perfect Brazilian Jiujitsu School</title>
        <meta name="description" content="Find the best Brazilian Jiujitsu schools near you. Search, compare, and connect with jiujitsu academies." />
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
        `}</style>
      </Head>

      <section id="hero">
        <h1>Find Your Perfect Jiujitsu School</h1>
        <p>
          <span className="animated-text-line">
            Find local Jiujitsu academies <span id="changing-text">{displayText}</span>
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
            <Link href="/schools?filter=categories" className="browse-tile">
              <div className="tile-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
                  <path d="M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c0-17.7 14.3-32 32-32H96V224 64zm448 0v32 96h32c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"/>
                </svg>
              </div>
              <h2>Browse by Categories</h2>
              <p>Find schools by training style and features</p>
            </Link>
            <Link href="/schools?filter=states" className="browse-tile">
              <div className="tile-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"/>
                </svg>
              </div>
              <h2>Browse by States</h2>
              <p>Explore schools in your area</p>
            </Link>
            <Link href="/schools?filter=popular" className="browse-tile">
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
      
      <section id="blog-posts" className="blog-posts-section">
        <div className="container text-center">
          <div className="section-header text-center">
            <h2>Latest from Our Blog</h2>
            <p>Stay updated with Jiujitsu news, tips, and community highlights</p>
          </div>
          <div className="blog-posts-grid">
            <article className="blog-card" data-category="Technique">
              <img src="/images/submission-bg.jpg" alt="Guard passing techniques" className="blog-image" />
              <div className="blog-content">
                <span className="blog-category">Technique</span>
                <h3 className="blog-title">5 Guard Passing Techniques Every Jiujitsu Student Should Know</h3>
                <p className="blog-excerpt">Master these fundamental guard passes to improve your top game and increase your submission success rate.</p>
                <div className="blog-footer">
                  <div className="blog-author">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Author" className="author-avatar" />
                    <div className="author-info">
                      <span className="author-name">Marcus Silva</span>
                      <span className="blog-date">Feb 19, 2025</span>
                    </div>
                  </div>
                  <a href="#" className="read-more">Read More <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </article>

            <article className="blog-card" data-category="Competition">
              <img src="/images/submission-bg.jpg" alt="Competition preparation" className="blog-image" />
              <div className="blog-content">
                <span className="blog-category">Competition</span>
                <h3 className="blog-title">Mental Preparation: The Key to Competition Success</h3>
                <p className="blog-excerpt">Learn proven strategies to develop mental toughness and overcome competition anxiety from top Jiujitsu competitors.</p>
                <div className="blog-footer">
                  <div className="blog-author">
                    <img src="https://i.pravatar.cc/150?img=9" alt="Author" className="author-avatar" />
                    <div className="author-info">
                      <span className="author-name">Ana Santos</span>
                      <span className="blog-date">Feb 17, 2025</span>
                    </div>
                  </div>
                  <a href="#" className="read-more">Read More <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </article>

            <article className="blog-card" data-category="Community">
              <img src="/images/submission-bg.jpg" alt="Jiujitsu training partners" className="blog-image" />
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
        </div>
      </section>

      <section id="schools-list">
        {/* School cards will be dynamically added here */}
      </section>
    </div>
  )
}
