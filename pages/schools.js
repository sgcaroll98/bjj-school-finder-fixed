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
      description: 'Apex Jiu-Jitsu specializes in competition training while maintaining a welcoming atmosphere for beginners.'
    },
    {
      id: '4',
      name: 'Warrior BJJ',
      city: 'Sacramento',
      state: 'CA',
      rating: 4.6,
      reviewCount: 83,
      categories: ['Gi', 'No-Gi', 'MMA'],
      image: '/images/school4.jpg',
      description: 'Combining traditional BJJ with MMA-focused training, Warrior BJJ develops well-rounded grapplers.'
    },
    {
      id: '5',
      name: 'Alliance Jiu-Jitsu',
      city: 'Atlanta',
      state: 'GA',
      rating: 4.9,
      reviewCount: 175,
      categories: ['Gi', 'No-Gi', 'Competition'],
      image: '/images/school5.jpg',
      description: 'A premier competition team with multiple world champions on staff, offering training for all skill levels.'
    },
    {
      id: '6',
      name: 'Renzo Gracie Academy',
      city: 'New York',
      state: 'NY',
      rating: 5.0,
      reviewCount: 302,
      categories: ['Gi', 'No-Gi', 'Self-Defense'],
      image: '/images/school6.jpg',
      description: 'Historic academy offering authentic Gracie Jiu-Jitsu with emphasis on both sport and self-defense applications.'
    },
    {
      id: '7',
      name: 'American Top Team',
      city: 'Miami',
      state: 'FL',
      rating: 4.8,
      reviewCount: 220,
      categories: ['No-Gi', 'MMA', 'Competition'],
      image: '/images/school7.jpg',
      description: 'World-famous MMA and grappling gym with elite coaches and a competition-focused environment.'
    },
    {
      id: '8',
      name: 'Unity Jiu-Jitsu',
      city: 'New York',
      state: 'NY',
      rating: 4.9,
      reviewCount: 165,
      categories: ['Gi', 'Competition', 'Advanced'],
      image: '/images/school8.jpg',
      description: 'Home to numerous world champions, Unity offers high-level training with an emphasis on modern competition techniques.'
    }
  ];
  
  // State name mapping
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
    'WY': 'Wyoming'
  };
  
  useEffect(() => {
    if (router.isReady) {
      setLoading(true);
      setError(null);
      
      // Set the current filter type
      if (filter) {
        setCurrentFilter(filter);
      }
      
      // If state is provided, filter schools by state
      if (state) {
        setCurrentState(state);
        // In a real application, you would fetch schools from API based on state
        // For now, we'll filter the mock data
        const filteredSchools = mockSchools.filter(
          school => school.state.toLowerCase() === state.toLowerCase()
        );
        setSchools(filteredSchools);
      } else if (filter === 'popular') {
        // If filter is popular, show all schools sorted by rating
        const sortedSchools = [...mockSchools].sort((a, b) => b.rating - a.rating);
        setSchools(sortedSchools);
      } else if (filter === 'categories') {
        // In a real app, you would handle category filtering here
        setSchools(mockSchools);
      } else if (filter === 'states') {
        // If filter is states, redirect to states page
        router.push('/states');
        return;
      } else {
        // Default behavior, show all schools
        setSchools(mockSchools);
      }
      
      setLoading(false);
    }
  }, [router.isReady, state, filter]);
  
  // Generate the page title based on the current filter
  const getPageTitle = () => {
    if (state && stateNames[state.toUpperCase()]) {
      return `BJJ Schools in ${stateNames[state.toUpperCase()]}`;
    } else if (filter === 'popular') {
      return 'Popular BJJ Schools';
    } else if (filter === 'categories') {
      return 'BJJ Schools by Category';
    } else {
      return 'BJJ Schools Directory';
    }
  };
  
  return (
    <div className="schools-container">
      <Head>
        <title>{getPageTitle()} | BJJ School Finder</title>
        <meta name="description" content={`Find the best Brazilian Jiu-Jitsu schools and academies ${state ? `in ${stateNames[state.toUpperCase()]}` : ''}.`} />
        <style jsx>{`
          .schools-container {
            padding: 2rem 1rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .page-header {
            text-align: center;
            margin-bottom: 2rem;
          }
          
          .page-title {
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 0.5rem;
          }
          
          .page-subtitle {
            font-size: 1.1rem;
            color: #666;
            max-width: 700px;
            margin: 0 auto;
          }
          
          .filters-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2rem;
            padding: 1rem;
            background-color: #f9fafb;
            border-radius: 8px;
            flex-wrap: wrap;
            gap: 1rem;
          }
          
          .filter-options {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
          }
          
          .filter-button {
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
            color: #4b5563;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .filter-button:hover {
            border-color: #4f46e5;
            color: #4f46e5;
          }
          
          .filter-button.active {
            background-color: #4f46e5;
            color: white;
            border-color: #4f46e5;
          }
          
          .sort-dropdown {
            padding: 0.5rem;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            background-color: white;
            font-size: 0.9rem;
          }
          
          .schools-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }
          
          .no-results {
            text-align: center;
            padding: 3rem 1rem;
            background-color: #f9fafb;
            border-radius: 8px;
            grid-column: 1 / -1;
          }
          
          .no-results h3 {
            font-size: 1.5rem;
            color: #4b5563;
            margin-bottom: 1rem;
          }
          
          .no-results p {
            font-size: 1rem;
            color: #6b7280;
            max-width: 500px;
            margin: 0 auto;
          }
          
          .return-link {
            display: inline-block;
            margin-top: 1rem;
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
          }
          
          .return-link:hover {
            text-decoration: underline;
          }
          
          @media (max-width: 768px) {
            .schools-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
            
            .page-title {
              font-size: 2rem;
            }
            
            .filters-bar {
              flex-direction: column;
              align-items: flex-start;
            }
          }
        `}</style>
      </Head>
      
      <div className="page-header">
        <h1 className="page-title">{getPageTitle()}</h1>
        <p className="page-subtitle">
          {state 
            ? `Discover the best Brazilian Jiu-Jitsu schools and academies in ${stateNames[state.toUpperCase()]}. Filter by training style, amenities, and more.` 
            : 'Browse our comprehensive directory of BJJ schools and find the perfect training environment for your goals.'}
        </p>
      </div>
      
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
  );
}

// Use the Layout component from _app.js to avoid duplicate footers
Schools.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
