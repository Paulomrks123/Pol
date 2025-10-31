
export interface Advertiser {
  id: string;
  page_id: string;
  name: string;
  verified: boolean;
  country: string;
  first_seen: string;
  last_seen: string;
  avatarUrl: string;
}

export interface Ad {
  id: string;
  ad_id: string;
  advertiser_id: string;
  title: string;
  body: string;
  landing_url: string;
  creative_type: 'image' | 'video' | 'carousel';
  media_url: string;
  status: 'active' | 'expired';
  start_time: string;
  end_time: string | null;
  spend_estimate: { min: number; max: number; currency: string };
  tags: string[];
}

export type AdType = 'all' | 'politics' | 'employment' | 'credit' | 'housing';

export interface FilterState {
  query: string;
  country: string;
  adType: AdType;
  status: 'all' | 'active' | 'expired';
  dateFrom: string;
  dateTo: string;
}

export type View = 'library' | 'dashboard';
