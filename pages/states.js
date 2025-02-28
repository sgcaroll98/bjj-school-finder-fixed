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
        <link rel="stylesheet" href="/styles/states.css" />
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
            <p className="no-results-text">
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
