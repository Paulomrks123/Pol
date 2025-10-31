
import React from 'react';
import type { FilterState, AdType } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
);

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFiltersChange({ ...filters, [e.target.name]: e.target.value });
  };
  
  const adTypeOptions: { value: AdType; label: string }[] = [
    { value: 'all', label: 'All Ads' },
    { value: 'politics', label: 'Politics & Issues' },
    { value: 'employment', label: 'Employment' },
    { value: 'credit', label: 'Credit' },
    { value: 'housing', label: 'Housing' },
  ];

  return (
    <div className="bg-brand-gray-600 p-4 rounded-lg mb-6 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div className="relative xl:col-span-2">
          <input
            type="text"
            name="query"
            value={filters.query}
            onChange={handleChange}
            placeholder="Search by keyword, advertiser, URL..."
            className="w-full bg-brand-gray-700 text-white border border-brand-gray-500 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-gray-300">
            <SearchIcon />
          </div>
        </div>
        <select
          name="country"
          value={filters.country}
          onChange={handleChange}
          className="w-full bg-brand-gray-700 text-white border border-brand-gray-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        >
          <option value="ALL">All Countries</option>
          <option value="US">United States</option>
          <option value="BR">Brazil</option>
          <option value="GB">United Kingdom</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
        </select>
        <select
          name="adType"
          value={filters.adType}
          onChange={handleChange}
          className="w-full bg-brand-gray-700 text-white border border-brand-gray-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        >
          {adTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
         <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="w-full bg-brand-gray-700 text-white border border-brand-gray-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
