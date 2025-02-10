export interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  bio?: string;
  socialLinks?: {
    spotify?: string;
    instagram?: string;
    twitter?: string;
  };
  stats?: {
    monthlyListeners?: number;
    followers?: number;
  };
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  artistId?: string;
}