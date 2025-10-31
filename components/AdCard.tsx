
import React from 'react';
import type { Ad, Advertiser } from '../types';

interface AdCardProps {
  ad: Ad;
  advertiser: Advertiser;
  onViewDetails: (ad: Ad) => void;
}

const PlayIcon = () => (
    <svg className="w-12 h-12 text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const AdCard: React.FC<AdCardProps> = ({ ad, advertiser, onViewDetails }) => {
  return (
    <div 
      className="bg-brand-gray-600 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
      onClick={() => onViewDetails(ad)}
    >
      <div className="relative aspect-square bg-black group">
        {ad.creative_type === 'video' ? (
          <>
            <img src={ad.media_url} alt={ad.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
                <PlayIcon />
            </div>
          </>
        ) : (
          <img src={ad.media_url} alt={ad.title} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img src={advertiser.avatarUrl} alt={advertiser.name} className="w-8 h-8 rounded-full mr-3" />
          <div>
            <p className="text-white font-semibold text-sm truncate">{advertiser.name}</p>
            <p className="text-brand-gray-200 text-xs">{advertiser.country}</p>
          </div>
        </div>
        <p className="text-brand-gray-100 text-sm h-10 overflow-hidden text-ellipsis">{ad.body}</p>
        <div className="mt-3 flex justify-between items-center text-xs text-brand-gray-300">
          <span>{ad.status === 'active' ? '🟢 Active' : '🔴 Expired'}</span>
          <span>{new Date(ad.start_time).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
