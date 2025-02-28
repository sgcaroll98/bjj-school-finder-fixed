import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Layout from '../components/Layout'

// List of all US states with their abbreviations
const statesList = [
  { name: 'Alabama', abbr: 'AL' },
  { name: 'Alaska', abbr: 'AK' },
  { name: 'Arizona', abbr: 'AZ' },
  { name: 'Arkansas', abbr: 'AR' },
  { name: 'California', abbr: 'CA' },
  { name: 'Colorado', abbr: 'CO' },
  { name: 'Connecticut', abbr: 'CT' },
  { name: 'Delaware', abbr: 'DE' },
  { name: 'Florida', abbr: 'FL' },
  { name: 'Georgia', abbr: 'GA' },
  { name: 'Hawaii', abbr: 'HI' },
  { name: 'Idaho', abbr: 'ID' },
  { name: 'Illinois', abbr: 'IL' },
  { name: 'Indiana', abbr: 'IN' },
  { name: 'Iowa', abbr: 'IA' },
  { name: 'Kansas', abbr: 'KS' },
  { name: 'Kentucky', abbr: 'KY' },
  { name: 'Louisiana', abbr: 'LA' },
  { name: 'Maine', abbr: 'ME' },
  { name: 'Maryland', abbr: 'MD' },
  { name: 'Massachusetts', abbr: 'MA' },
  { name: 'Michigan', abbr: 'MI' },
  { name: 'Minnesota', abbr: 'MN' },
  { name: 'Mississippi', abbr: 'MS' },
  { name: 'Missouri', abbr: 'MO' },
  { name: 'Montana', abbr: 'MT' },
  { name: 'Nebraska', abbr: 'NE' },
  { name: 'Nevada', abbr: 'NV' },
  { name: 'New Hampshire', abbr: 'NH' },
  { name: 'New Jersey', abbr: 'NJ' },
  { name: 'New Mexico', abbr: 'NM' },
  { name: 'New York', abbr: 'NY' },
  { name: 'North Carolina', abbr: 'NC' },
  { name: 'North Dakota', abbr: 'ND' },
  { name: 'Ohio', abbr: 'OH' },
  { name: 'Oklahoma', abbr: 'OK' },
  { name: 'Oregon', abbr: 'OR' },
  { name: 'Pennsylvania', abbr: 'PA' },
  { name: 'Rhode Island', abbr: 'RI' },
  { name: 'South Carolina', abbr: 'SC' },
  { name: 'South Dakota', abbr: 'SD' },
  { name: 'Tennessee', abbr: 'TN' },
  { name: 'Texas', abbr: 'TX' },
  { name: 'Utah', abbr: 'UT' },
  { name: 'Vermont', abbr: 'VT' },
  { name: 'Virginia', abbr: 'VA' },
  { name: 'Washington', abbr: 'WA' },
  { name: 'West Virginia', abbr: 'WV' },
  { name: 'Wisconsin', abbr: 'WI' },
  { name: 'Wyoming', abbr: 'WY' }
];

// Group states by first letter for better organization
const groupStatesByFirstLetter = (states) => {
  const grouped = {};
  
  states.forEach(state => {
    const firstLetter = state.name.charAt(0);
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(state);
  });
  
  return grouped;
};

export default function States() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredState, setHoveredState] = useState(null);
  
  // Filter states based on search term
  const filteredStates = statesList.filter(state => 
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    state.abbr.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group filtered states by first letter
  const groupedStates = groupStatesByFirstLetter(filteredStates);
  
  return (
    <Layout>
      <Head>
        <title>Browse BJJ Schools by State | BJJ School Finder</title>
        <meta name="description" content="Explore Brazilian Jiu-Jitsu schools and academies across different states in the US." />
        <style jsx>{`
          .states-container {
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
            max-width: 600px;
            margin: 0 auto;
          }
          
          .search-box {
            max-width: 500px;
            margin: 0 auto 2rem;
            position: relative;
          }
          
          .search-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          
          .search-input:focus {
            outline: none;
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
          }
          
          .states-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }
          
          .letter-group {
            margin-bottom: 2rem;
          }
          
          .letter-heading {
            font-size: 1.5rem;
            color: #4f46e5;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e5e7eb;
          }
          
          .state-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 1rem;
          }
          
          .state-card {
            position: relative;
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
            transition: all 0.2s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          }
          
          .state-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            border-color: #4f46e5;
          }
          
          .state-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 0.25rem;
          }
          
          .state-abbr {
            font-size: 0.9rem;
            color: #666;
            background-color: #f3f4f6;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            display: inline-block;
            margin-top: 0.5rem;
          }
          
          .state-schools-count {
            font-size: 0.8rem;
            color: #4f46e5;
            margin-top: 0.5rem;
          }
          
          .tooltip {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4f46e5;
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 4px;
            font-size: 0.8rem;
            z-index: 10;
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s ease;
            white-space: nowrap;
          }
          
          .tooltip:before {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent #4f46e5 transparent;
          }
          
          .state-card:hover .tooltip {
            opacity: 1;
            visibility: visible;
          }
          
          .alpha-nav {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
            padding: 1rem;
            background-color: #f9fafb;
            border-radius: 8px;
          }
          
          .alpha-link {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            color: #4f46e5;
            text-decoration: none;
            transition: all 0.15s ease;
          }
          
          .alpha-link:hover {
            background-color: #4f46e5;
            color: white;
            border-color: #4f46e5;
          }
          
          @media (max-width: 768px) {
            .states-list {
              grid-template-columns: 1fr;
            }
            
            .state-grid {
              grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            }
            
            .page-title {
              font-size: 2rem;
            }
          }
        `}</style>
      </Head>
      
      <div className="states-container">
        <div className="page-header">
          <h1 className="page-title">Browse BJJ Schools by State</h1>
          <p className="page-subtitle">
            Find Brazilian Jiu-Jitsu schools and academies in your state or explore BJJ opportunities across the United States.
          </p>
        </div>
        
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredStates.length > 0 && (
          <div className="alpha-nav">
            {Object.keys(groupedStates).sort().map(letter => (
              <a href={`#${letter}`} className="alpha-link" key={letter}>
                {letter}
              </a>
            ))}
          </div>
        )}
        
        <div className="states-list">
          {Object.keys(groupedStates).sort().map(letter => (
            <div className="letter-group" key={letter} id={letter}>
              <h2 className="letter-heading">{letter}</h2>
              <div className="state-grid">
                {groupedStates[letter].map(state => (
                  <Link 
                    href={`/schools?state=${state.abbr}`} 
                    key={state.abbr}
                    passHref
                  >
                    <div 
                      className="state-card"
                      onMouseEnter={() => setHoveredState(state.abbr)}
                      onMouseLeave={() => setHoveredState(null)}
                    >
                      <span className="state-name">{state.name}</span>
                      <span className="state-abbr">{state.abbr}</span>
                      <span className="state-schools-count">
                        {/* This would be replaced with actual count from API */}
                        15+ schools
                      </span>
                      {hoveredState === state.abbr && (
                        <div className="tooltip">
                          View BJJ schools in {state.name}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {filteredStates.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              No states found matching "{searchTerm}". Try a different search term.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
