import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout>
      <Head>
        <title>About - Jiujitsu School Finder</title>
        <meta name="description" content="Learn about our mission to connect people with Brazilian Jiu-Jitsu schools across the United States." />
        <link rel="stylesheet" href="/styles/about.css" />
      </Head>

      <div className="home-container">
        <section id="about-header" className="about-hero">
          <h1>About Our Mission</h1>
          <p><span className="animated-text-line">Connecting People with Jiujitsu</span></p>
        </section>

        <section className="browse-section">
          <div className="container">
            <div className="browse-tiles">
              <div className="browse-tile">
                <div className="tile-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <h2>Our Mission</h2>
                <p>The BJJ School Directory was created with a simple but powerful mission: to connect people with Brazilian Jiu-Jitsu schools and help BJJ academies gain more visibility in their communities.</p>
              </div>
              <div className="browse-tile">
                <div className="tile-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h2>For Practitioners</h2>
                <p>We provide an easy-to-use platform to discover BJJ schools in your area, complete with essential information like location, schedule, and contact details.</p>
              </div>
              <div className="browse-tile">
                <div className="tile-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
                    <path d="M17 2v20"></path>
                    <path d="M7 2v20"></path>
                    <path d="M2 12h20"></path>
                    <path d="M2 7h5"></path>
                    <path d="M2 17h5"></path>
                    <path d="M17 17h5"></path>
                    <path d="M17 7h5"></path>
                  </svg>
                </div>
                <h2>For Schools</h2>
                <p>We offer increased online visibility and exposure to help schools connect with potential students who are actively looking to train.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default About;
