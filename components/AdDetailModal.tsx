
import React, { useState, useCallback } from 'react';
import type { Ad, Advertiser } from '../types';
import Modal from './ui/Modal';
import Spinner from './ui/Spinner';
import { generateAdTags } from '../services/geminiService';


interface AdDetailModalProps {
  ad: Ad | null;
  advertiser: Advertiser | null;
  onClose: () => void;
}

const AdDetailModal: React.FC<AdDetailModalProps> = ({ ad, advertiser, onClose }) => {
  const [isTagging, setIsTagging] = useState(false);
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);

  const handleGenerateTags = useCallback(async () => {
    if (!ad) return;
    setIsTagging(true);
    setGeneratedTags([]);
    try {
      const tags = await generateAdTags(ad.body, ad.title);
      setGeneratedTags(tags);
    } catch (error) {
      console.error("Failed to generate tags", error);
      setGeneratedTags(["Error generating tags"]);
    } finally {
      setIsTagging(false);
    }
  }, [ad]);


  if (!ad || !advertiser) return null;

  const allTags = [...ad.tags, ...generatedTags];

  return (
    <Modal isOpen={!!ad} onClose={onClose} title="Ad Details">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
        {/* Left Column: Creative */}
        <div className="space-y-4">
          <div className="bg-black rounded-lg overflow-hidden">
            {ad.creative_type === 'video' ? (
              <video src={ad.media_url} controls className="w-full"></video>
            ) : (
              <img src={ad.media_url} alt={ad.title} className="w-full object-contain" />
            )}
          </div>
          <div className="p-4 bg-brand-gray-600 rounded-lg">
             <h3 className="font-bold text-lg mb-2">{ad.title}</h3>
             <p className="text-brand-gray-100">{ad.body}</p>
          </div>
        </div>

        {/* Right Column: Metadata */}
        <div className="space-y-4">
          <div className="p-4 bg-brand-gray-600 rounded-lg">
            <h4 className="font-semibold text-brand-gray-100 border-b border-brand-gray-500 pb-2 mb-2">Advertiser</h4>
            <div className="flex items-center">
              <img src={advertiser.avatarUrl} alt={advertiser.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-bold">{advertiser.name} {advertiser.verified && '✔️'}</p>
                <p className="text-sm text-brand-gray-200">Page ID: {advertiser.page_id}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-brand-gray-600 rounded-lg grid grid-cols-2 gap-4">
            <div><strong className="text-brand-gray-200 block">Status</strong> {ad.status === 'active' ? '🟢 Active' : '🔴 Expired'}</div>
            <div><strong className="text-brand-gray-200 block">Type</strong> {ad.creative_type.toUpperCase()}</div>
            <div><strong className="text-brand-gray-200 block">Start Date</strong> {new Date(ad.start_time).toLocaleDateString()}</div>
            <div><strong className="text-brand-gray-200 block">End Date</strong> {ad.end_time ? new Date(ad.end_time).toLocaleDateString() : 'N/A'}</div>
            <div className="col-span-2"><strong className="text-brand-gray-200 block">Spend (Est.)</strong> {ad.spend_estimate.min} - {ad.spend_estimate.max} {ad.spend_estimate.currency}</div>
            <div className="col-span-2">
                <strong className="text-brand-gray-200 block">Landing Page</strong>
                <a href={ad.landing_url} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline break-all">{ad.landing_url}</a>
            </div>
          </div>
          
           <div className="p-4 bg-brand-gray-600 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-brand-gray-100">AI Tags</h4>
              <button
                onClick={handleGenerateTags}
                disabled={isTagging}
                className="bg-brand-blue text-white px-3 py-1 text-sm rounded-md hover:bg-opacity-90 disabled:bg-brand-gray-500 disabled:cursor-not-allowed flex items-center"
              >
                {isTagging ? <Spinner className="w-4 h-4 mr-2" /> : 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v1h-2V4H7v1H5V4zM5 7h10v9a2 2 0 01-2 2H7a2 2 0 01-2-2V7z" />
                </svg>
                }
                {isTagging ? 'Analyzing...' : 'Generate Tags'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.length > 0 ? allTags.map((tag, index) => (
                <span key={index} className="bg-brand-gray-500 text-brand-gray-100 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
              )) : <span className="text-sm text-brand-gray-300">No tags yet. Click "Generate Tags" to analyze with AI.</span>}
            </div>
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default AdDetailModal;
