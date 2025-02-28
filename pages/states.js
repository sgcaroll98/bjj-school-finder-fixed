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
  { name: 'Wyoming', abbr: 'WY' },
  { name: 'District of Columbia', abbr: 'DC' }
];

export default function States() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states based on search term
  const filteredStates = statesList.filter(state => 
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    state.abbr.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
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
          
          .states-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
          
          .state-button {
            display: block;
            background-color: #f3f4f6;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1.25rem 1rem;
            text-align: center;
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            text-decoration: none;
            transition: all 0.2s ease;
          }
          
          .state-button:hover {
            background-color: #4f46e5;
            color: white;
            border-color: #4f46e5;
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          
          .no-results {
            text-align: center;
            padding: 3rem 1rem;
            background-color: #f9fafb;
            border-radius: 8px;
            grid-column: 1 / -1;
          }
          
          @media (max-width: 768px) {
            .states-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .page-title {
              font-size: 2rem;
            }
          }
          
          @media (max-width: 480px) {
            .states-grid {
              grid-template-columns: 1fr;
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
        
        {filteredStates.length > 0 ? (
          <div className="states-grid">
            {filteredStates.map(state => (
              <Link 
                href={`/schools?state=${state.abbr}`} 
                key={state.abbr}
                className="state-button"
              >
                {state.name}
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              No states found matching "{searchTerm}". Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Use the Layout component from _app.js to avoid duplicate footers
States.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
