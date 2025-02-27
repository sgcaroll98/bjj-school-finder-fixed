import { useState } from 'react'

export default function FilterSidebar({ filters, onChange }) {
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
    'Wisconsin', 'Wyoming'
  ];
  
  const handleStateChange = (e) => {
    onChange({ state: e.target.value });
  };
  
  const handleCheckboxChange = (e) => {
    onChange({ [e.target.name]: e.target.checked });
  };
  
  const clearFilters = () => {
    onChange({
      state: '',
      hasGi: false,
      hasNogi: false,
      hasKids: false,
      hasComp: false,
      hasWomen: false
    });
  };
  
  return (
    <div className="filter-sidebar bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Filter Schools</h2>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">State</label>
        <select 
          value={filters.state} 
          onChange={handleStateChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All States</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Training Options</h3>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="hasGi" 
              name="hasGi" 
              checked={filters.hasGi} 
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="hasGi" className="ml-2 text-gray-700">Gi Training</label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="hasNogi" 
              name="hasNogi" 
              checked={filters.hasNogi} 
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="hasNogi" className="ml-2 text-gray-700">No-Gi Training</label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="hasKids" 
              name="hasKids" 
              checked={filters.hasKids} 
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="hasKids" className="ml-2 text-gray-700">Kids Classes</label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="hasComp" 
              name="hasComp" 
              checked={filters.hasComp} 
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="hasComp" className="ml-2 text-gray-700">Competition Training</label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="hasWomen" 
              name="hasWomen" 
              checked={filters.hasWomen} 
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="hasWomen" className="ml-2 text-gray-700">Women's Classes</label>
          </div>
        </div>
      </div>
      
      <button 
        onClick={clearFilters}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200"
      >
        Clear Filters
      </button>
    </div>
  )
}
