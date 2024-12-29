// src/types/index.ts
export interface Artist {
    id: string;
    name: string;
    email: string;
    bio?: string;
    spotify_url?: string;
    soundcloud_url?: string;
    instagram_url?: string;
    press_kit?: Record<string, any>;
    availability?: Record<string, any>;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Promoter {
    id: string;
    name: string;
    email: string;
    city?: string;
    venues?: string[];
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Gig {
    id: string;
    artist_id: string;
    promoter_id?: string;
    venue: string;
    date: Date;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    fee?: number;
    details?: Record<string, any>;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Message {
    id: string;
    gig_id: string;
    type: 'email' | 'chat';
    content: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    // Additional fields from joins
    venue?: string;
    gig_date?: Date;
    promoter_name?: string;
  }
  
  export interface GroupedMessage {
    id: string;
    content: string;
    type: 'email' | 'chat';
    created_at: Date;
    status: string;
  }
  
  export interface GigMessageGroup {
    gig_id: string;
    venue: string;
    gig_date: Date;
    promoter_name: string;
    messages: GroupedMessage[];
  }
  
  export interface MessageGroups {
    [gigId: string]: GigMessageGroup;
  }