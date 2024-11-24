export interface ListingData {
  title: string;
  description: string;
  bulletPoints: string[];
  keywords: string[];
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';