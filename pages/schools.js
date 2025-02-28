import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import SchoolCard from '../components/SchoolCard'
import { supabase } from '../lib/supabaseClient'
import Layout from '../components/Layout'

export default function Schools() {
  const router = useRouter();
  const { state, filter } = router.query;
  
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('');
  const [currentState, setCurrentState] = useState('');
  
  // Mock data for schools - would be replaced with real data from API
  const mockSchools = [
    {
      id: '1',
      name: 'Elite BJJ Academy',
      city: 'San Francisco',
      state: 'CA',
      rating: 4.8,
      reviewCount: 124,
      categories: ['Gi', 'No-Gi', 'Competition'],
      image: '/images/school1.jpg',
      description: 'Elite BJJ Academy offers world-class instruction for all levels, with dedicated competition training and a supportive community.'
    },
    {
      id: '2',
      name: 'Gracie Barra Downtown',
      city: 'Los Angeles',
      state: 'CA',
      rating: 4.9,
      reviewCount: 210,
      categories: ['Gi', 'No-Gi', 'Kids Classes'],
      image: '/images/school2.jpg',
      description: 'Part of the world-renowned Gracie Barra network, offering structured curriculum for both adults and children.'
    },
    {
      id: '3',
      name: 'Apex Jiu-Jitsu',
      city: 'San Diego',
      state: 'CA',
      rating: 4.7,
      reviewCount: 98,
      categories: ['Gi', 'Competition', 'Beginners'],
      image: '/images/school3.jpg',
      description: 'Apex Jiu-Jitsu focuses on technical excellence for competitive and recreational practitioners.'
    },
    {
      id: '4',
      name: 'Evolution BJJ',
      city: 'New York',
      state: 'NY',
      rating: 4.9,
      reviewCount: 156,
      categories: ['Gi', 'No-Gi', 'MMA'],
      image: '/images/school4.jpg',
      description: 'Evolution BJJ combines traditional Brazilian Jiu-Jitsu with modern techniques for a well-rounded training experience.'
    },
    {
      id: '5',
      name: 'Warrior Jiu-Jitsu',
      city: 'Chicago',
      state: 'IL',
      rating: 4.6,
      reviewCount: 87,
      categories: ['No-Gi', 'Wrestling', 'Self-Defense'],
      image: '/images/school5.jpg',
      description: 'Warrior Jiu-Jitsu emphasizes practical self-defense applications and no-gi techniques with a wrestling influence.'
    },
    {
      id: '6',
      name: 'Unity Jiu-Jitsu',
      city: 'Miami',
      state: 'FL',
      rating: 4.8,
      reviewCount: 112,
      categories: ['Gi', 'No-Gi', 'Kids Classes'],
      image: '/images/school6.jpg',
      description: 'Unity Jiu-Jitsu provides a friendly, inclusive environment for practitioners of all ages and skill levels.'
    }
  ];
  
  // State name mapping for display
  const stateNames = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming',
    'DC': 'District of Columbia'
  };
  
  // Fetch schools data
  useEffect(() => {
    // In a real app, you would fetch from API/database
    // For now, let's use the mock data
    
    setTimeout(() => {
      let filteredSchools = [...mockSchools];
      
      if (state) {
        setCurrentState(state.toUpperCase());
        filteredSchools = filteredSchools.filter(school => 
          school.state.toUpperCase() === state.toUpperCase()
        );
      }
      
      if (filter) {
        setCurrentFilter(filter);
        // Additional filtering logic would go here
      }
      
      setSchools(filteredSchools);
      setLoading(false);
    }, 1000); // Simulate loading delay
    
  }, [state, filter]);
  
  const getPageTitle = () => {
    if (state) {
      return `BJJ Schools in ${stateNames[state.toUpperCase()]}`;
    } else if (filter === 'popular') {
      return 'Popular BJJ Schools';
    } else if (filter === 'categories') {
      return 'BJJ Schools by Category';
    } else {
      return 'Find BJJ Schools Near You';
    }
  };
  
  return (
    <div>
      <Head>
        <title>{getPageTitle()} | BJJ School Finder</title>
        <meta name="description" content={`Find the best Brazilian Jiu-Jitsu schools and academies ${state ? `in ${stateNames[state.toUpperCase()]}` : ''}.`} />
      </Head>
      
      <section className="schools-hero">
        <div className="container">
          <h1>{getPageTitle()}</h1>
          <p>
            {state 
              ? `Discover the best Brazilian Jiu-Jitsu schools and academies in ${stateNames[state.toUpperCase()]}.` 
              : 'Find the perfect Brazilian Jiu-Jitsu school for your training journey.'}
          </p>
        </div>
      </section>
      
      <div className="schools-container">
        <div className="filters-bar">
          <div className="filter-options">
            <Link href="/schools?filter=popular">
              <button className={`filter-button ${filter === 'popular' ? 'active' : ''}`}>
                Popular Schools
              </button>
            </Link>
            <Link href="/schools?filter=categories">
              <button className={`filter-button ${filter === 'categories' ? 'active' : ''}`}>
                By Category
              </button>
            </Link>
            <Link href="/states">
              <button className={`filter-button ${filter === 'states' || state ? 'active' : ''}`}>
                By State
              </button>
            </Link>
          </div>
          
          <select className="sort-dropdown">
            <option value="rating">Sort by: Rating</option>
            <option value="reviews">Sort by: Most Reviews</option>
            <option value="name">Sort by: Name A-Z</option>
            <option value="newest">Sort by: Newest</option>
          </select>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p>Loading schools...</p>
          </div>
        ) : (
          <>
            {schools.length > 0 ? (
              <div className="schools-grid">
                {schools.map(school => (
                  <SchoolCard key={school.id} school={school} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No schools found</h3>
                <p>
                  {state 
                    ? `We couldn't find any BJJ schools in ${stateNames[state.toUpperCase()]} matching your criteria. Try adjusting your filters or check back later as our database grows.`
                    : 'No schools match your current search criteria. Try adjusting your filters or search terms.'}
                </p>
                <Link href="/states" className="return-link">
                  Return to Browse by State
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Use the Layout component from _app.js to avoid duplicate footers
Schools.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
