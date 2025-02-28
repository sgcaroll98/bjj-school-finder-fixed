import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Jiujitsu School Finder | Find Your Perfect BJJ Academy</title>
        <meta name="description" content="Find the best Brazilian Jiujitsu schools and academies near you with our comprehensive database and filters." />
      </Head>
      
      <div className="home-container">
        <section id="hero">
          <h1>Find Your Perfect Jiujitsu School</h1>
          <p>Find local Jiujitsu academies near you</p>
          <div className="search-container">
            <input type="text" id="location-input" placeholder="Enter your location..." />
            <button id="search-btn">Search</button>
          </div>
        </section>
        
        <section id="browse-section" className="browse-section">
          <div className="container">
            <div className="browse-tiles">
              <Link href="/schools" className="browse-tile">
                <h2>Browse All Schools</h2>
                <p>Find schools in your area</p>
              </Link>
              <Link href="/states" className="browse-tile">
                <h2>Browse by States</h2>
                <p>Find schools in your state</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
