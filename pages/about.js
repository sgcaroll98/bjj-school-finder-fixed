import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function About() {
  return (
    <div className="home-container">
      <Head>
        <title>About - Jiujitsu School Finder</title>
        <meta name="description" content="Learn about our mission to connect people with Brazilian Jiu-Jitsu schools across the United States." />
        <link rel="stylesheet" href="/styles/about.css" />
      </Head>

      <section id="about-header" className="about-hero">
        <h1>About Our Mission</h1>
        <p><span className="animated-text-line">Connecting People with Jiujitsu</span></p>
      </section>

      <section className="browse-section">
        <div className="container">
          <div className="browse-tiles">
            <div className="browse-tile">
              <div className="tile-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h2>Our Mission</h2>
              <p>The BJJ School Directory was created with a simple but powerful mission: to connect people with Brazilian Jiu-Jitsu schools and help BJJ academies gain more visibility in their communities.</p>
            </div>
            <div className="browse-tile">
              <div className="tile-icon">
                <i className="fas fa-users"></i>
              </div>
              <h2>For Practitioners</h2>
              <p>We provide an easy-to-use platform to discover BJJ schools in your area, complete with essential information like location, schedule, and contact details.</p>
            </div>
            <div className="browse-tile">
              <div className="tile-icon">
                <i className="fas fa-building"></i>
              </div>
              <h2>For Schools</h2>
              <p>We offer increased online visibility and exposure to help schools connect with potential students who are actively looking to train.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-gyms-section">
        <div className="container text-center">
          <div className="section-header text-center">
            <h2>Key Features</h2>
            <p>What makes our platform unique</p>
          </div>
          <div className="featured-gyms-grid">
            <div className="featured-gym-card">
              <div className="gym-info">
                <div className="gym-header">
                  <h3><i className="fas fa-search"></i> Easy Search</h3>
                </div>
                <p>Find schools quickly using our intuitive search functionality</p>
              </div>
            </div>
            <div className="featured-gym-card">
              <div className="gym-info">
                <div className="gym-header">
                  <h3><i className="fas fa-info-circle"></i> Detailed Profiles</h3>
                </div>
                <p>Access comprehensive information about each school</p>
              </div>
            </div>
            <div className="featured-gym-card">
              <div className="gym-info">
                <div className="gym-header">
                  <h3><i className="fas fa-mobile-alt"></i> Mobile Friendly</h3>
                </div>
                <p>Access our directory from any device, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Use the Layout component from _app.js to avoid duplicate footers
About.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
