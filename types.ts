
export interface FilterItem {
  id: string;
  label: string;
  category: string;
}

export interface MetricCard {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export interface CompanyInfo {
  name: string;
  professionals: number;
  growth: string;
  growthType: 'positive' | 'negative' | 'neutral';
  jobPosts: number;
  logo: string;
}

export interface LocationInfo {
  name: string;
  professionals: number;
}
