// src/types/index.ts
export interface Artist {
    id: string;
    name: string;
    email: string;
    bio?: string;
    spotify_url?: string;
    soundcloud_url?: string;
    instagram_url?: string;
    press_kit?: Record<string, unknown>;
    availability?: Record<string, unknown>;
  }
  
  export interface Gig {
    id: string;
    artist_id: string;
    promoter_id?: string;
    venue: string;
    date: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    fee?: number;
    details?: Record<string, unknown>;
  }