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
