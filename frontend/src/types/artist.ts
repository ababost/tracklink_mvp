export interface Artist {
  id: string;
  name: string;
  email: string;
  phone?: string;
  genre?: string;
  bio?: string;
  location?: string;
  availability?: {
    dates: string[];
    preferences?: {
      venues?: string[];
      cities?: string[];
    };
  };
  createdAt: string;
  updatedAt: string;
}