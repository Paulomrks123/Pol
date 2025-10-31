
import React, { useState, useMemo } from 'react';
import type { Ad, Advertiser, FilterState, View } from './types';
import FilterPanel from './components/FilterPanel';
import AdCard from './components/AdCard';
import AdDetailModal from './components/AdDetailModal';
import Dashboard from './components/Dashboard';

// Mock Data
const MOCK_ADVERTISERS: Advertiser[] = Array.from({ length: 10 }, (_, i) => ({
  id: `adv_${i}`,
  page_id: `${1000 + i}`,
  name: `Advertiser ${String.fromCharCode(65 + i)} Inc.`,
  verified: i % 2 === 0,
  country: ['US', 'BR', 'GB', 'CA', 'AU'][i % 5],
  first_seen: '2023-01-15T10:00:00Z',
  last_seen: '2023-10-20T18:00:00Z',
  avatarUrl: `https://picsum.photos/seed/${1000+i}/40/40`,
}));

const MOCK_ADS: Ad[] = Array.from({ length: 50 }, (_, i) => ({
  id: `ad_${i}`,
  ad_id: `meta_ad_${2000 + i}`,
  advertiser_id: `adv_${i % 10}`,
  title: `Amazing Product Offer ${i + 1}`,
  body: `Check out our new line of products. This is creative number ${i+1} with a special discount just for you. Don't miss out! #specialoffer`,
  landing_url: 'https://example.com',
  creative_type: i % 3 === 0 ? 'video' : (i % 3 === 1 ? 'image' : 'carousel'),
  media_url: i % 3 === 0 ? 'https://dummy-media.s3.amazonaws.com/video.mp4' : `https://picsum.photos/seed/${i}/500/500`,
  status: i % 4 === 0 ? 'expired' : 'active',
  start_time: `2023-0${(i % 9) + 1}-01T12:00:00Z`,
  end_time: i % 4 === 0 ? `2023-0${(i % 9) + 2}-01T12:00:00Z` : null,
  spend_estimate: { min: 100 * (i + 1), max: 500 * (i + 1), currency: 'USD' },
  tags: i % 2 === 0 ? ['E-commerce', 'Promotion'] : ['Brand Awareness', 'Lifestyle'],
}));
const advertisersMap = new Map(MOCK_ADVERTISERS.map(a => [a.id, a]));

const SidebarIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="mr-3">{children}</span>;

const LibraryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;


const App: React.FC = () => {
  const [view, setView] = useState<View>('library');
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    country: 'ALL',
    adType: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
  });
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  const filteredAds = useMemo(() => {
    return MOCK_ADS.filter(ad => {
      const advertiser = advertisersMap.get(ad.advertiser_id);
      const queryLower = filters.query.toLowerCase();
      
      const matchesQuery = !filters.query || 
        ad.body.toLowerCase().includes(queryLower) ||
        ad.title.toLowerCase().includes(queryLower) ||
        advertiser?.name.toLowerCase().includes(queryLower);
        
      const matchesCountry = filters.country === 'ALL' || advertiser?.country === filters.country;
      const matchesStatus = filters.status === 'all' || ad.status === filters.status;
      // AdType filter is mocked as we don't have this data
      const matchesAdType = filters.adType === 'all' || true;

      return matchesQuery && matchesCountry && matchesStatus && matchesAdType;
    });
  }, [filters]);

  const handleViewDetails = (ad: Ad) => {
    setSelectedAd(ad);
  };

  const handleCloseModal = () => {
    setSelectedAd(null);
  };

  const selectedAdvertiser = selectedAd ? advertisersMap.get(selectedAd.advertiser_id) : null;

  return (
    <div className="flex h-screen bg-brand-gray-700 text-white font-sans">
      {/* Sidebar */}
      <nav className="w-64 bg-brand-gray-800 p-4 flex flex-col">
        <div className="text-2xl font-bold mb-8 text-center text-brand-blue">AdMiner</div>
        <ul>
          <li
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${view === 'library' ? 'bg-brand-blue text-white' : 'hover:bg-brand-gray-600'}`}
            onClick={() => setView('library')}
          >
            <SidebarIcon><LibraryIcon/></SidebarIcon> Ad Library
          </li>
          <li
            className={`flex items-center p-3 mt-2 rounded-lg cursor-pointer transition-colors ${view === 'dashboard' ? 'bg-brand-blue text-white' : 'hover:bg-brand-gray-600'}`}
            onClick={() => setView('dashboard')}
          >
            <SidebarIcon><DashboardIcon/></SidebarIcon> Dashboard
          </li>
        </ul>
        <div className="mt-auto text-center text-xs text-brand-gray-400">
          <p>&copy; 2024 AdMiner</p>
          <p>Compliance & Terms</p>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {view === 'library' && (
          <>
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredAds.map(ad => {
                const advertiser = advertisersMap.get(ad.advertiser_id);
                if (!advertiser) return null;
                return <AdCard key={ad.id} ad={ad} advertiser={advertiser} onViewDetails={handleViewDetails} />;
              })}
            </div>
          </>
        )}
        {view === 'dashboard' && <Dashboard />}
      </main>
      
      <AdDetailModal ad={selectedAd} advertiser={selectedAdvertiser} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
