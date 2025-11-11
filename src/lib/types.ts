export type PerformanceData = {
  campaign: string;
  ctr: number;
  clicks: number;
  revenue: number;
  status: 'Activa' | 'Pausada' | 'Finalizada';
};

export type RevenueData = {
  month: string;
  revenue: number;
};

export type Campaign = {
    name: string;
    status: 'Activa' | 'Pausada' | 'Finalizada' | 'Borrador';
    budget: number;
    spend: number;
    clicks: number;
    cpc: number;
    ctr: number;
    adCreative?: {
      title: string;
      subtitle: string;
      imageUrl: string;
      imageHint: string;
      cta: string;
      discount?: string;
      // Modal specific data
      offerTitle?: string;
      offerSubtitle?: string;
      description?: string;
      location?: string;
      phone?: string;
      hours?: string;
      services?: string[];
    };
};

export interface Plan {
    name: string;
    price: string;
    renewalDate: string;
    features?: string[];
}
