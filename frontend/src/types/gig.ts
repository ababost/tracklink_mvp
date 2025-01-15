export interface Gig {
  id: string;
  title: string;
  date: string;
  venue: string;
  location: string;
  description?: string;
  artistId?: string;
  promoterId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment?: {
    amount: number;
    currency: string;
    method?: string;
  };
  requirements?: {
    technical?: string;
    hospitality?: string;
  };
  createdAt: string;
  updatedAt: string;
}